import {
  ConflictException,
  ForbiddenException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager, In } from 'typeorm';

import { ArticleEntity } from '../../../database/entities/article.entity';
import { TagEntity } from '../../../database/entities/tag.entity';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { ArticleRepository } from '../../repository/services/article.repository';
import { LikeRepository } from '../../repository/services/like.repository';
import { TagRepository } from '../../repository/services/tag.repository';
import { ArticleListRequestDto } from '../models/dto/request/article-list.request.dto';
import { CreateArticleRequestDto } from '../models/dto/request/create-article.request.dto';
import { EditArticleRequestDto } from '../models/dto/request/edit-article.request.dto';
import { ArticleResponseDto } from '../models/dto/response/article.response.dto';
import { ArticleListResponseDto } from '../models/dto/response/article-list.response.dto';
import { ArticleMapper } from './article.mapper';

@Injectable()
export class ArticleService {
  constructor(
    private readonly likeRepository: LikeRepository,
    private readonly articleRepository: ArticleRepository,
    private readonly tagRepository: TagRepository,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  public async getList(
    query: ArticleListRequestDto,
    userData: IUserData,
  ): Promise<ArticleListResponseDto> {
    const [entities, total] = await this.articleRepository.getList(
      query,
      userData,
    );

    return ArticleMapper.toListResponseDto(entities, total, query);
  }

  public async create(
    dto: CreateArticleRequestDto,
    userData: IUserData,
  ): Promise<ArticleResponseDto> {
    return await this.entityManager.transaction(async (em: EntityManager) => {
      const tags = await this.createTagsForArticle(dto.tags, em);
      const articleRepository = em.getRepository(ArticleEntity);
      const article = await articleRepository.save(
        articleRepository.create({
          ...dto,
          user_id: userData.userId,
          tags,
        }),
      );
      return ArticleMapper.toResponseDto(article);
    });
  }

  public async getArticleById(
    articleId: string,
    userData: IUserData,
  ): Promise<ArticleResponseDto> {
    const article = await this.articleRepository.getArticleById(
      articleId,
      userData,
    );
    if (!article) {
      throw new UnprocessableEntityException();
    }
    return ArticleMapper.toResponseDto(article);
  }

  public async createTagsForArticle(
    tags: string[],
    em: EntityManager,
  ): Promise<TagEntity[]> {
    if (!tags.length) return [];
    const tagRepository = em.getRepository(TagEntity);

    const tagEntities = await tagRepository.findBy({
      name: In(tags),
    });
    const tagNamesFromDB = new Set(tagEntities.map(({ name }) => name));
    const newTagNames = tags.filter((tag) => !tagNamesFromDB.has(tag));

    const newEntities = await tagRepository.save(
      newTagNames.map((name) => tagRepository.create({ name })),
    );
    return [...tagEntities, ...newEntities];
  }

  public async editArticleById(
    articleId: string,
    userData: IUserData,
    dto: EditArticleRequestDto,
  ): Promise<ArticleResponseDto> {
    const article = await this.findMyOneByIdOrThrow(articleId, userData.userId);
    const newArticle = await this.articleRepository.save({
      ...article,
      ...dto,
    });
    return ArticleMapper.toResponseDto(newArticle);
  }

  public async deleteArticleById(
    articleId: string,
    userData: IUserData,
  ): Promise<void> {
    const article = await this.findMyOneByIdOrThrow(articleId, userData.userId);
    await this.articleRepository.remove(article);
  }

  public async like(articleId: string, userData: IUserData): Promise<void> {
    const article = await this.articleRepository.findOneBy({ id: articleId });
    if (article.user_id === userData.userId) {
      throw new ForbiddenException('You cant like your article');
    }
    const like = await this.likeRepository.findOneBy({
      user_id: userData.userId,
      article_id: article.id,
    });
    if (like) {
      throw new ForbiddenException('You already like this article');
    }
    await this.likeRepository.save(
      this.likeRepository.create({
        user_id: userData.userId,
        article_id: article.id,
      }),
    );
  }

  public async dislike(articleId: string, userData: IUserData): Promise<void> {
    const article = await this.articleRepository.findOneBy({ id: articleId });

    const like = await this.likeRepository.findOneBy({
      user_id: userData.userId,
      article_id: article.id,
    });
    if (!like) {
      throw new ConflictException('You cant dislike this article');
    }
    await this.likeRepository.remove(like);
  }

  private async findMyOneByIdOrThrow(
    articleId: string,
    userId: string,
  ): Promise<ArticleEntity> {
    const article = await this.articleRepository.findOneBy({
      id: articleId,
    });
    if (!article) {
      throw new UnprocessableEntityException();
    }
    if (article.user_id !== userId) {
      throw new ForbiddenException();
    }
    return article;
  }
}
