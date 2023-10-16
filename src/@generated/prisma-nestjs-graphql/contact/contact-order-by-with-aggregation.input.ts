import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { SortOrderInput } from '../prisma/sort-order.input';
import { ContactCountOrderByAggregateInput } from './contact-count-order-by-aggregate.input';
import { ContactAvgOrderByAggregateInput } from './contact-avg-order-by-aggregate.input';
import { ContactMaxOrderByAggregateInput } from './contact-max-order-by-aggregate.input';
import { ContactMinOrderByAggregateInput } from './contact-min-order-by-aggregate.input';
import { ContactSumOrderByAggregateInput } from './contact-sum-order-by-aggregate.input';

@InputType()
export class ContactOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    email?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    phone?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    name?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    createdAt?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    updatedAt?: keyof typeof SortOrder;

    @Field(() => SortOrderInput, {nullable:true})
    deletedAt?: SortOrderInput;

    @Field(() => ContactCountOrderByAggregateInput, {nullable:true})
    _count?: ContactCountOrderByAggregateInput;

    @Field(() => ContactAvgOrderByAggregateInput, {nullable:true})
    _avg?: ContactAvgOrderByAggregateInput;

    @Field(() => ContactMaxOrderByAggregateInput, {nullable:true})
    _max?: ContactMaxOrderByAggregateInput;

    @Field(() => ContactMinOrderByAggregateInput, {nullable:true})
    _min?: ContactMinOrderByAggregateInput;

    @Field(() => ContactSumOrderByAggregateInput, {nullable:true})
    _sum?: ContactSumOrderByAggregateInput;
}
