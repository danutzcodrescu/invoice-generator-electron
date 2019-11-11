import { Arg, ID, Mutation, Query, Resolver } from 'type-graphql';
import { EntityManager } from 'typeorm';
import { InjectManager } from 'typeorm-typedi-extensions';
import { Profile } from '../entities/Profile.entity';
import { insertTransaction, nonNullObjectProperties } from '../utils/helpers';
import { UpdateProfileInput } from './types/invoice.helpers';

@Resolver(Profile)
export class ProfileResolver {
  @InjectManager()
  private entityManager: EntityManager;

  @Query(returns => [Profile])
  profiles(): Promise<Profile[]> {
    return this.entityManager.find(Profile, { relations: ['invoices'] });
  }

  @Query(returns => Profile)
  profile(
    @Arg('profileId', type => ID) id: string,
  ): Promise<Profile | undefined> {
    return this.entityManager.findOne(Profile, id, { relations: ['invoices'] });
  }

  @Mutation(returns => Profile)
  async updateProfile(
    @Arg('id', type => ID) id: string,
    @Arg('profileData') profileData: UpdateProfileInput,
  ): Promise<any> {
    await this.entityManager.update(Profile, id, profileData);
    return this.entityManager.findOne(Profile, id, { relations: ['invoices'] });
  }

  @Mutation(returns => Profile)
  async addProfile(
    @Arg('firstName', { nullable: true }) firstName?: string,
    @Arg('lastName', { nullable: true }) lastName?: string,
    @Arg('company', { nullable: true }) company?: string,
    @Arg('email', { nullable: true }) email?: string,
    @Arg('address', { nullable: true }) address?: string,
    @Arg('vat', { nullable: true }) vat?: string,
    @Arg('bankAccount', { nullable: true }) bankAccount?: string,
    @Arg('phone', { nullable: true }) phone?: string,
  ): Promise<Profile> {
    let profile: Profile;
    const obj = nonNullObjectProperties({
      firstName,
      lastName,
      address,
      email,
      company,
      vat,
      bankAccount,
      phone,
    });
    await this.entityManager.transaction(async transactionManager => {
      profile = await insertTransaction(
        Profile,
        transactionManager,
        obj as any,
      );
    });
    return profile!;
  }
}
