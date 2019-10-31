import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { EntityManager } from 'typeorm';
import { InjectManager } from 'typeorm-typedi-extensions';
import { Profile } from '../entities/Profile.entity';
import { insertTransaction, nonNullObjectProperties } from '../utils/helpers';

@Resolver(Profile)
export class ProfileResolver {
  @InjectManager()
  private entityManager: EntityManager;

  @Query(returns => [Profile])
  profiles(): Promise<Profile[]> {
    return this.entityManager.find(Profile);
  }

  @Mutation(returns => Profile)
  async addProfile(
    @Arg('firstName', { nullable: true }) firstName?: string,
    @Arg('lastName', { nullable: true }) lastName?: string,
    @Arg('company', { nullable: true }) company?: string,
    @Arg('email', { nullable: true }) email?: string,
    @Arg('address', { nullable: true }) address?: string,
    @Arg('vat', { nullable: true }) vat?: string,
  ): Promise<Profile> {
    let profile: Profile;
    const obj = nonNullObjectProperties({
      firstName,
      lastName,
      address,
      email,
      company,
      vat,
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
