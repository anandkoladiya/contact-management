import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ContactCountAggregate } from './contact-count-aggregate.output';
import { ContactAvgAggregate } from './contact-avg-aggregate.output';
import { ContactSumAggregate } from './contact-sum-aggregate.output';
import { ContactMinAggregate } from './contact-min-aggregate.output';
import { ContactMaxAggregate } from './contact-max-aggregate.output';

@ObjectType()
export class AggregateContact {

    @Field(() => ContactCountAggregate, {nullable:true})
    _count?: ContactCountAggregate;

    @Field(() => ContactAvgAggregate, {nullable:true})
    _avg?: ContactAvgAggregate;

    @Field(() => ContactSumAggregate, {nullable:true})
    _sum?: ContactSumAggregate;

    @Field(() => ContactMinAggregate, {nullable:true})
    _min?: ContactMinAggregate;

    @Field(() => ContactMaxAggregate, {nullable:true})
    _max?: ContactMaxAggregate;
}
