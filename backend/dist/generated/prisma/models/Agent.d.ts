import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model Agent
 *
 */
export type AgentModel = runtime.Types.Result.DefaultSelection<Prisma.$AgentPayload>;
export type AggregateAgent = {
    _count: AgentCountAggregateOutputType | null;
    _min: AgentMinAggregateOutputType | null;
    _max: AgentMaxAggregateOutputType | null;
};
export type AgentMinAggregateOutputType = {
    id: string | null;
    ownerUserId: string | null;
    name: string | null;
    handle: string | null;
    bio: string | null;
    avatarUrl: string | null;
    systemPrompt: string | null;
    modelName: string | null;
    safetyLevel: string | null;
    isPublic: boolean | null;
    originType: $Enums.AgentOriginType | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type AgentMaxAggregateOutputType = {
    id: string | null;
    ownerUserId: string | null;
    name: string | null;
    handle: string | null;
    bio: string | null;
    avatarUrl: string | null;
    systemPrompt: string | null;
    modelName: string | null;
    safetyLevel: string | null;
    isPublic: boolean | null;
    originType: $Enums.AgentOriginType | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type AgentCountAggregateOutputType = {
    id: number;
    ownerUserId: number;
    name: number;
    handle: number;
    bio: number;
    avatarUrl: number;
    systemPrompt: number;
    modelName: number;
    safetyLevel: number;
    isPublic: number;
    originType: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type AgentMinAggregateInputType = {
    id?: true;
    ownerUserId?: true;
    name?: true;
    handle?: true;
    bio?: true;
    avatarUrl?: true;
    systemPrompt?: true;
    modelName?: true;
    safetyLevel?: true;
    isPublic?: true;
    originType?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type AgentMaxAggregateInputType = {
    id?: true;
    ownerUserId?: true;
    name?: true;
    handle?: true;
    bio?: true;
    avatarUrl?: true;
    systemPrompt?: true;
    modelName?: true;
    safetyLevel?: true;
    isPublic?: true;
    originType?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type AgentCountAggregateInputType = {
    id?: true;
    ownerUserId?: true;
    name?: true;
    handle?: true;
    bio?: true;
    avatarUrl?: true;
    systemPrompt?: true;
    modelName?: true;
    safetyLevel?: true;
    isPublic?: true;
    originType?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type AgentAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Agent to aggregate.
     */
    where?: Prisma.AgentWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Agents to fetch.
     */
    orderBy?: Prisma.AgentOrderByWithRelationInput | Prisma.AgentOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.AgentWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Agents from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Agents.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Agents
    **/
    _count?: true | AgentCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: AgentMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: AgentMaxAggregateInputType;
};
export type GetAgentAggregateType<T extends AgentAggregateArgs> = {
    [P in keyof T & keyof AggregateAgent]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateAgent[P]> : Prisma.GetScalarType<T[P], AggregateAgent[P]>;
};
export type AgentGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AgentWhereInput;
    orderBy?: Prisma.AgentOrderByWithAggregationInput | Prisma.AgentOrderByWithAggregationInput[];
    by: Prisma.AgentScalarFieldEnum[] | Prisma.AgentScalarFieldEnum;
    having?: Prisma.AgentScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: AgentCountAggregateInputType | true;
    _min?: AgentMinAggregateInputType;
    _max?: AgentMaxAggregateInputType;
};
export type AgentGroupByOutputType = {
    id: string;
    ownerUserId: string | null;
    name: string;
    handle: string;
    bio: string | null;
    avatarUrl: string | null;
    systemPrompt: string;
    modelName: string;
    safetyLevel: string;
    isPublic: boolean;
    originType: $Enums.AgentOriginType;
    createdAt: Date;
    updatedAt: Date;
    _count: AgentCountAggregateOutputType | null;
    _min: AgentMinAggregateOutputType | null;
    _max: AgentMaxAggregateOutputType | null;
};
type GetAgentGroupByPayload<T extends AgentGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<AgentGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof AgentGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], AgentGroupByOutputType[P]> : Prisma.GetScalarType<T[P], AgentGroupByOutputType[P]>;
}>>;
export type AgentWhereInput = {
    AND?: Prisma.AgentWhereInput | Prisma.AgentWhereInput[];
    OR?: Prisma.AgentWhereInput[];
    NOT?: Prisma.AgentWhereInput | Prisma.AgentWhereInput[];
    id?: Prisma.StringFilter<"Agent"> | string;
    ownerUserId?: Prisma.StringNullableFilter<"Agent"> | string | null;
    name?: Prisma.StringFilter<"Agent"> | string;
    handle?: Prisma.StringFilter<"Agent"> | string;
    bio?: Prisma.StringNullableFilter<"Agent"> | string | null;
    avatarUrl?: Prisma.StringNullableFilter<"Agent"> | string | null;
    systemPrompt?: Prisma.StringFilter<"Agent"> | string;
    modelName?: Prisma.StringFilter<"Agent"> | string;
    safetyLevel?: Prisma.StringFilter<"Agent"> | string;
    isPublic?: Prisma.BoolFilter<"Agent"> | boolean;
    originType?: Prisma.EnumAgentOriginTypeFilter<"Agent"> | $Enums.AgentOriginType;
    createdAt?: Prisma.DateTimeFilter<"Agent"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Agent"> | Date | string;
    owner?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    posts?: Prisma.PostListRelationFilter;
    comments?: Prisma.CommentListRelationFilter;
    reactions?: Prisma.ReactionListRelationFilter;
    following?: Prisma.FollowListRelationFilter;
    followers?: Prisma.FollowListRelationFilter;
};
export type AgentOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    ownerUserId?: Prisma.SortOrderInput | Prisma.SortOrder;
    name?: Prisma.SortOrder;
    handle?: Prisma.SortOrder;
    bio?: Prisma.SortOrderInput | Prisma.SortOrder;
    avatarUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    systemPrompt?: Prisma.SortOrder;
    modelName?: Prisma.SortOrder;
    safetyLevel?: Prisma.SortOrder;
    isPublic?: Prisma.SortOrder;
    originType?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    owner?: Prisma.UserOrderByWithRelationInput;
    posts?: Prisma.PostOrderByRelationAggregateInput;
    comments?: Prisma.CommentOrderByRelationAggregateInput;
    reactions?: Prisma.ReactionOrderByRelationAggregateInput;
    following?: Prisma.FollowOrderByRelationAggregateInput;
    followers?: Prisma.FollowOrderByRelationAggregateInput;
};
export type AgentWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    handle?: string;
    AND?: Prisma.AgentWhereInput | Prisma.AgentWhereInput[];
    OR?: Prisma.AgentWhereInput[];
    NOT?: Prisma.AgentWhereInput | Prisma.AgentWhereInput[];
    ownerUserId?: Prisma.StringNullableFilter<"Agent"> | string | null;
    name?: Prisma.StringFilter<"Agent"> | string;
    bio?: Prisma.StringNullableFilter<"Agent"> | string | null;
    avatarUrl?: Prisma.StringNullableFilter<"Agent"> | string | null;
    systemPrompt?: Prisma.StringFilter<"Agent"> | string;
    modelName?: Prisma.StringFilter<"Agent"> | string;
    safetyLevel?: Prisma.StringFilter<"Agent"> | string;
    isPublic?: Prisma.BoolFilter<"Agent"> | boolean;
    originType?: Prisma.EnumAgentOriginTypeFilter<"Agent"> | $Enums.AgentOriginType;
    createdAt?: Prisma.DateTimeFilter<"Agent"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Agent"> | Date | string;
    owner?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    posts?: Prisma.PostListRelationFilter;
    comments?: Prisma.CommentListRelationFilter;
    reactions?: Prisma.ReactionListRelationFilter;
    following?: Prisma.FollowListRelationFilter;
    followers?: Prisma.FollowListRelationFilter;
}, "id" | "handle">;
export type AgentOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    ownerUserId?: Prisma.SortOrderInput | Prisma.SortOrder;
    name?: Prisma.SortOrder;
    handle?: Prisma.SortOrder;
    bio?: Prisma.SortOrderInput | Prisma.SortOrder;
    avatarUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    systemPrompt?: Prisma.SortOrder;
    modelName?: Prisma.SortOrder;
    safetyLevel?: Prisma.SortOrder;
    isPublic?: Prisma.SortOrder;
    originType?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.AgentCountOrderByAggregateInput;
    _max?: Prisma.AgentMaxOrderByAggregateInput;
    _min?: Prisma.AgentMinOrderByAggregateInput;
};
export type AgentScalarWhereWithAggregatesInput = {
    AND?: Prisma.AgentScalarWhereWithAggregatesInput | Prisma.AgentScalarWhereWithAggregatesInput[];
    OR?: Prisma.AgentScalarWhereWithAggregatesInput[];
    NOT?: Prisma.AgentScalarWhereWithAggregatesInput | Prisma.AgentScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Agent"> | string;
    ownerUserId?: Prisma.StringNullableWithAggregatesFilter<"Agent"> | string | null;
    name?: Prisma.StringWithAggregatesFilter<"Agent"> | string;
    handle?: Prisma.StringWithAggregatesFilter<"Agent"> | string;
    bio?: Prisma.StringNullableWithAggregatesFilter<"Agent"> | string | null;
    avatarUrl?: Prisma.StringNullableWithAggregatesFilter<"Agent"> | string | null;
    systemPrompt?: Prisma.StringWithAggregatesFilter<"Agent"> | string;
    modelName?: Prisma.StringWithAggregatesFilter<"Agent"> | string;
    safetyLevel?: Prisma.StringWithAggregatesFilter<"Agent"> | string;
    isPublic?: Prisma.BoolWithAggregatesFilter<"Agent"> | boolean;
    originType?: Prisma.EnumAgentOriginTypeWithAggregatesFilter<"Agent"> | $Enums.AgentOriginType;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Agent"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Agent"> | Date | string;
};
export type AgentCreateInput = {
    id?: string;
    name: string;
    handle: string;
    bio?: string | null;
    avatarUrl?: string | null;
    systemPrompt: string;
    modelName: string;
    safetyLevel: string;
    isPublic?: boolean;
    originType: $Enums.AgentOriginType;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    owner?: Prisma.UserCreateNestedOneWithoutAgentsInput;
    posts?: Prisma.PostCreateNestedManyWithoutAuthorInput;
    comments?: Prisma.CommentCreateNestedManyWithoutAuthorInput;
    reactions?: Prisma.ReactionCreateNestedManyWithoutReactorInput;
    following?: Prisma.FollowCreateNestedManyWithoutFollowerInput;
    followers?: Prisma.FollowCreateNestedManyWithoutFollowedInput;
};
export type AgentUncheckedCreateInput = {
    id?: string;
    ownerUserId?: string | null;
    name: string;
    handle: string;
    bio?: string | null;
    avatarUrl?: string | null;
    systemPrompt: string;
    modelName: string;
    safetyLevel: string;
    isPublic?: boolean;
    originType: $Enums.AgentOriginType;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    posts?: Prisma.PostUncheckedCreateNestedManyWithoutAuthorInput;
    comments?: Prisma.CommentUncheckedCreateNestedManyWithoutAuthorInput;
    reactions?: Prisma.ReactionUncheckedCreateNestedManyWithoutReactorInput;
    following?: Prisma.FollowUncheckedCreateNestedManyWithoutFollowerInput;
    followers?: Prisma.FollowUncheckedCreateNestedManyWithoutFollowedInput;
};
export type AgentUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    handle?: Prisma.StringFieldUpdateOperationsInput | string;
    bio?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    avatarUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    systemPrompt?: Prisma.StringFieldUpdateOperationsInput | string;
    modelName?: Prisma.StringFieldUpdateOperationsInput | string;
    safetyLevel?: Prisma.StringFieldUpdateOperationsInput | string;
    isPublic?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    originType?: Prisma.EnumAgentOriginTypeFieldUpdateOperationsInput | $Enums.AgentOriginType;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    owner?: Prisma.UserUpdateOneWithoutAgentsNestedInput;
    posts?: Prisma.PostUpdateManyWithoutAuthorNestedInput;
    comments?: Prisma.CommentUpdateManyWithoutAuthorNestedInput;
    reactions?: Prisma.ReactionUpdateManyWithoutReactorNestedInput;
    following?: Prisma.FollowUpdateManyWithoutFollowerNestedInput;
    followers?: Prisma.FollowUpdateManyWithoutFollowedNestedInput;
};
export type AgentUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    ownerUserId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    handle?: Prisma.StringFieldUpdateOperationsInput | string;
    bio?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    avatarUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    systemPrompt?: Prisma.StringFieldUpdateOperationsInput | string;
    modelName?: Prisma.StringFieldUpdateOperationsInput | string;
    safetyLevel?: Prisma.StringFieldUpdateOperationsInput | string;
    isPublic?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    originType?: Prisma.EnumAgentOriginTypeFieldUpdateOperationsInput | $Enums.AgentOriginType;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    posts?: Prisma.PostUncheckedUpdateManyWithoutAuthorNestedInput;
    comments?: Prisma.CommentUncheckedUpdateManyWithoutAuthorNestedInput;
    reactions?: Prisma.ReactionUncheckedUpdateManyWithoutReactorNestedInput;
    following?: Prisma.FollowUncheckedUpdateManyWithoutFollowerNestedInput;
    followers?: Prisma.FollowUncheckedUpdateManyWithoutFollowedNestedInput;
};
export type AgentCreateManyInput = {
    id?: string;
    ownerUserId?: string | null;
    name: string;
    handle: string;
    bio?: string | null;
    avatarUrl?: string | null;
    systemPrompt: string;
    modelName: string;
    safetyLevel: string;
    isPublic?: boolean;
    originType: $Enums.AgentOriginType;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type AgentUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    handle?: Prisma.StringFieldUpdateOperationsInput | string;
    bio?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    avatarUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    systemPrompt?: Prisma.StringFieldUpdateOperationsInput | string;
    modelName?: Prisma.StringFieldUpdateOperationsInput | string;
    safetyLevel?: Prisma.StringFieldUpdateOperationsInput | string;
    isPublic?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    originType?: Prisma.EnumAgentOriginTypeFieldUpdateOperationsInput | $Enums.AgentOriginType;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AgentUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    ownerUserId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    handle?: Prisma.StringFieldUpdateOperationsInput | string;
    bio?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    avatarUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    systemPrompt?: Prisma.StringFieldUpdateOperationsInput | string;
    modelName?: Prisma.StringFieldUpdateOperationsInput | string;
    safetyLevel?: Prisma.StringFieldUpdateOperationsInput | string;
    isPublic?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    originType?: Prisma.EnumAgentOriginTypeFieldUpdateOperationsInput | $Enums.AgentOriginType;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AgentListRelationFilter = {
    every?: Prisma.AgentWhereInput;
    some?: Prisma.AgentWhereInput;
    none?: Prisma.AgentWhereInput;
};
export type AgentOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type AgentCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    ownerUserId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    handle?: Prisma.SortOrder;
    bio?: Prisma.SortOrder;
    avatarUrl?: Prisma.SortOrder;
    systemPrompt?: Prisma.SortOrder;
    modelName?: Prisma.SortOrder;
    safetyLevel?: Prisma.SortOrder;
    isPublic?: Prisma.SortOrder;
    originType?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type AgentMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    ownerUserId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    handle?: Prisma.SortOrder;
    bio?: Prisma.SortOrder;
    avatarUrl?: Prisma.SortOrder;
    systemPrompt?: Prisma.SortOrder;
    modelName?: Prisma.SortOrder;
    safetyLevel?: Prisma.SortOrder;
    isPublic?: Prisma.SortOrder;
    originType?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type AgentMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    ownerUserId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    handle?: Prisma.SortOrder;
    bio?: Prisma.SortOrder;
    avatarUrl?: Prisma.SortOrder;
    systemPrompt?: Prisma.SortOrder;
    modelName?: Prisma.SortOrder;
    safetyLevel?: Prisma.SortOrder;
    isPublic?: Prisma.SortOrder;
    originType?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type AgentScalarRelationFilter = {
    is?: Prisma.AgentWhereInput;
    isNot?: Prisma.AgentWhereInput;
};
export type AgentCreateNestedManyWithoutOwnerInput = {
    create?: Prisma.XOR<Prisma.AgentCreateWithoutOwnerInput, Prisma.AgentUncheckedCreateWithoutOwnerInput> | Prisma.AgentCreateWithoutOwnerInput[] | Prisma.AgentUncheckedCreateWithoutOwnerInput[];
    connectOrCreate?: Prisma.AgentCreateOrConnectWithoutOwnerInput | Prisma.AgentCreateOrConnectWithoutOwnerInput[];
    createMany?: Prisma.AgentCreateManyOwnerInputEnvelope;
    connect?: Prisma.AgentWhereUniqueInput | Prisma.AgentWhereUniqueInput[];
};
export type AgentUncheckedCreateNestedManyWithoutOwnerInput = {
    create?: Prisma.XOR<Prisma.AgentCreateWithoutOwnerInput, Prisma.AgentUncheckedCreateWithoutOwnerInput> | Prisma.AgentCreateWithoutOwnerInput[] | Prisma.AgentUncheckedCreateWithoutOwnerInput[];
    connectOrCreate?: Prisma.AgentCreateOrConnectWithoutOwnerInput | Prisma.AgentCreateOrConnectWithoutOwnerInput[];
    createMany?: Prisma.AgentCreateManyOwnerInputEnvelope;
    connect?: Prisma.AgentWhereUniqueInput | Prisma.AgentWhereUniqueInput[];
};
export type AgentUpdateManyWithoutOwnerNestedInput = {
    create?: Prisma.XOR<Prisma.AgentCreateWithoutOwnerInput, Prisma.AgentUncheckedCreateWithoutOwnerInput> | Prisma.AgentCreateWithoutOwnerInput[] | Prisma.AgentUncheckedCreateWithoutOwnerInput[];
    connectOrCreate?: Prisma.AgentCreateOrConnectWithoutOwnerInput | Prisma.AgentCreateOrConnectWithoutOwnerInput[];
    upsert?: Prisma.AgentUpsertWithWhereUniqueWithoutOwnerInput | Prisma.AgentUpsertWithWhereUniqueWithoutOwnerInput[];
    createMany?: Prisma.AgentCreateManyOwnerInputEnvelope;
    set?: Prisma.AgentWhereUniqueInput | Prisma.AgentWhereUniqueInput[];
    disconnect?: Prisma.AgentWhereUniqueInput | Prisma.AgentWhereUniqueInput[];
    delete?: Prisma.AgentWhereUniqueInput | Prisma.AgentWhereUniqueInput[];
    connect?: Prisma.AgentWhereUniqueInput | Prisma.AgentWhereUniqueInput[];
    update?: Prisma.AgentUpdateWithWhereUniqueWithoutOwnerInput | Prisma.AgentUpdateWithWhereUniqueWithoutOwnerInput[];
    updateMany?: Prisma.AgentUpdateManyWithWhereWithoutOwnerInput | Prisma.AgentUpdateManyWithWhereWithoutOwnerInput[];
    deleteMany?: Prisma.AgentScalarWhereInput | Prisma.AgentScalarWhereInput[];
};
export type AgentUncheckedUpdateManyWithoutOwnerNestedInput = {
    create?: Prisma.XOR<Prisma.AgentCreateWithoutOwnerInput, Prisma.AgentUncheckedCreateWithoutOwnerInput> | Prisma.AgentCreateWithoutOwnerInput[] | Prisma.AgentUncheckedCreateWithoutOwnerInput[];
    connectOrCreate?: Prisma.AgentCreateOrConnectWithoutOwnerInput | Prisma.AgentCreateOrConnectWithoutOwnerInput[];
    upsert?: Prisma.AgentUpsertWithWhereUniqueWithoutOwnerInput | Prisma.AgentUpsertWithWhereUniqueWithoutOwnerInput[];
    createMany?: Prisma.AgentCreateManyOwnerInputEnvelope;
    set?: Prisma.AgentWhereUniqueInput | Prisma.AgentWhereUniqueInput[];
    disconnect?: Prisma.AgentWhereUniqueInput | Prisma.AgentWhereUniqueInput[];
    delete?: Prisma.AgentWhereUniqueInput | Prisma.AgentWhereUniqueInput[];
    connect?: Prisma.AgentWhereUniqueInput | Prisma.AgentWhereUniqueInput[];
    update?: Prisma.AgentUpdateWithWhereUniqueWithoutOwnerInput | Prisma.AgentUpdateWithWhereUniqueWithoutOwnerInput[];
    updateMany?: Prisma.AgentUpdateManyWithWhereWithoutOwnerInput | Prisma.AgentUpdateManyWithWhereWithoutOwnerInput[];
    deleteMany?: Prisma.AgentScalarWhereInput | Prisma.AgentScalarWhereInput[];
};
export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
};
export type BoolFieldUpdateOperationsInput = {
    set?: boolean;
};
export type EnumAgentOriginTypeFieldUpdateOperationsInput = {
    set?: $Enums.AgentOriginType;
};
export type AgentCreateNestedOneWithoutFollowingInput = {
    create?: Prisma.XOR<Prisma.AgentCreateWithoutFollowingInput, Prisma.AgentUncheckedCreateWithoutFollowingInput>;
    connectOrCreate?: Prisma.AgentCreateOrConnectWithoutFollowingInput;
    connect?: Prisma.AgentWhereUniqueInput;
};
export type AgentCreateNestedOneWithoutFollowersInput = {
    create?: Prisma.XOR<Prisma.AgentCreateWithoutFollowersInput, Prisma.AgentUncheckedCreateWithoutFollowersInput>;
    connectOrCreate?: Prisma.AgentCreateOrConnectWithoutFollowersInput;
    connect?: Prisma.AgentWhereUniqueInput;
};
export type AgentUpdateOneRequiredWithoutFollowingNestedInput = {
    create?: Prisma.XOR<Prisma.AgentCreateWithoutFollowingInput, Prisma.AgentUncheckedCreateWithoutFollowingInput>;
    connectOrCreate?: Prisma.AgentCreateOrConnectWithoutFollowingInput;
    upsert?: Prisma.AgentUpsertWithoutFollowingInput;
    connect?: Prisma.AgentWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.AgentUpdateToOneWithWhereWithoutFollowingInput, Prisma.AgentUpdateWithoutFollowingInput>, Prisma.AgentUncheckedUpdateWithoutFollowingInput>;
};
export type AgentUpdateOneRequiredWithoutFollowersNestedInput = {
    create?: Prisma.XOR<Prisma.AgentCreateWithoutFollowersInput, Prisma.AgentUncheckedCreateWithoutFollowersInput>;
    connectOrCreate?: Prisma.AgentCreateOrConnectWithoutFollowersInput;
    upsert?: Prisma.AgentUpsertWithoutFollowersInput;
    connect?: Prisma.AgentWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.AgentUpdateToOneWithWhereWithoutFollowersInput, Prisma.AgentUpdateWithoutFollowersInput>, Prisma.AgentUncheckedUpdateWithoutFollowersInput>;
};
export type AgentCreateNestedOneWithoutPostsInput = {
    create?: Prisma.XOR<Prisma.AgentCreateWithoutPostsInput, Prisma.AgentUncheckedCreateWithoutPostsInput>;
    connectOrCreate?: Prisma.AgentCreateOrConnectWithoutPostsInput;
    connect?: Prisma.AgentWhereUniqueInput;
};
export type AgentUpdateOneRequiredWithoutPostsNestedInput = {
    create?: Prisma.XOR<Prisma.AgentCreateWithoutPostsInput, Prisma.AgentUncheckedCreateWithoutPostsInput>;
    connectOrCreate?: Prisma.AgentCreateOrConnectWithoutPostsInput;
    upsert?: Prisma.AgentUpsertWithoutPostsInput;
    connect?: Prisma.AgentWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.AgentUpdateToOneWithWhereWithoutPostsInput, Prisma.AgentUpdateWithoutPostsInput>, Prisma.AgentUncheckedUpdateWithoutPostsInput>;
};
export type AgentCreateNestedOneWithoutCommentsInput = {
    create?: Prisma.XOR<Prisma.AgentCreateWithoutCommentsInput, Prisma.AgentUncheckedCreateWithoutCommentsInput>;
    connectOrCreate?: Prisma.AgentCreateOrConnectWithoutCommentsInput;
    connect?: Prisma.AgentWhereUniqueInput;
};
export type AgentUpdateOneRequiredWithoutCommentsNestedInput = {
    create?: Prisma.XOR<Prisma.AgentCreateWithoutCommentsInput, Prisma.AgentUncheckedCreateWithoutCommentsInput>;
    connectOrCreate?: Prisma.AgentCreateOrConnectWithoutCommentsInput;
    upsert?: Prisma.AgentUpsertWithoutCommentsInput;
    connect?: Prisma.AgentWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.AgentUpdateToOneWithWhereWithoutCommentsInput, Prisma.AgentUpdateWithoutCommentsInput>, Prisma.AgentUncheckedUpdateWithoutCommentsInput>;
};
export type AgentCreateNestedOneWithoutReactionsInput = {
    create?: Prisma.XOR<Prisma.AgentCreateWithoutReactionsInput, Prisma.AgentUncheckedCreateWithoutReactionsInput>;
    connectOrCreate?: Prisma.AgentCreateOrConnectWithoutReactionsInput;
    connect?: Prisma.AgentWhereUniqueInput;
};
export type AgentUpdateOneRequiredWithoutReactionsNestedInput = {
    create?: Prisma.XOR<Prisma.AgentCreateWithoutReactionsInput, Prisma.AgentUncheckedCreateWithoutReactionsInput>;
    connectOrCreate?: Prisma.AgentCreateOrConnectWithoutReactionsInput;
    upsert?: Prisma.AgentUpsertWithoutReactionsInput;
    connect?: Prisma.AgentWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.AgentUpdateToOneWithWhereWithoutReactionsInput, Prisma.AgentUpdateWithoutReactionsInput>, Prisma.AgentUncheckedUpdateWithoutReactionsInput>;
};
export type AgentCreateWithoutOwnerInput = {
    id?: string;
    name: string;
    handle: string;
    bio?: string | null;
    avatarUrl?: string | null;
    systemPrompt: string;
    modelName: string;
    safetyLevel: string;
    isPublic?: boolean;
    originType: $Enums.AgentOriginType;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    posts?: Prisma.PostCreateNestedManyWithoutAuthorInput;
    comments?: Prisma.CommentCreateNestedManyWithoutAuthorInput;
    reactions?: Prisma.ReactionCreateNestedManyWithoutReactorInput;
    following?: Prisma.FollowCreateNestedManyWithoutFollowerInput;
    followers?: Prisma.FollowCreateNestedManyWithoutFollowedInput;
};
export type AgentUncheckedCreateWithoutOwnerInput = {
    id?: string;
    name: string;
    handle: string;
    bio?: string | null;
    avatarUrl?: string | null;
    systemPrompt: string;
    modelName: string;
    safetyLevel: string;
    isPublic?: boolean;
    originType: $Enums.AgentOriginType;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    posts?: Prisma.PostUncheckedCreateNestedManyWithoutAuthorInput;
    comments?: Prisma.CommentUncheckedCreateNestedManyWithoutAuthorInput;
    reactions?: Prisma.ReactionUncheckedCreateNestedManyWithoutReactorInput;
    following?: Prisma.FollowUncheckedCreateNestedManyWithoutFollowerInput;
    followers?: Prisma.FollowUncheckedCreateNestedManyWithoutFollowedInput;
};
export type AgentCreateOrConnectWithoutOwnerInput = {
    where: Prisma.AgentWhereUniqueInput;
    create: Prisma.XOR<Prisma.AgentCreateWithoutOwnerInput, Prisma.AgentUncheckedCreateWithoutOwnerInput>;
};
export type AgentCreateManyOwnerInputEnvelope = {
    data: Prisma.AgentCreateManyOwnerInput | Prisma.AgentCreateManyOwnerInput[];
    skipDuplicates?: boolean;
};
export type AgentUpsertWithWhereUniqueWithoutOwnerInput = {
    where: Prisma.AgentWhereUniqueInput;
    update: Prisma.XOR<Prisma.AgentUpdateWithoutOwnerInput, Prisma.AgentUncheckedUpdateWithoutOwnerInput>;
    create: Prisma.XOR<Prisma.AgentCreateWithoutOwnerInput, Prisma.AgentUncheckedCreateWithoutOwnerInput>;
};
export type AgentUpdateWithWhereUniqueWithoutOwnerInput = {
    where: Prisma.AgentWhereUniqueInput;
    data: Prisma.XOR<Prisma.AgentUpdateWithoutOwnerInput, Prisma.AgentUncheckedUpdateWithoutOwnerInput>;
};
export type AgentUpdateManyWithWhereWithoutOwnerInput = {
    where: Prisma.AgentScalarWhereInput;
    data: Prisma.XOR<Prisma.AgentUpdateManyMutationInput, Prisma.AgentUncheckedUpdateManyWithoutOwnerInput>;
};
export type AgentScalarWhereInput = {
    AND?: Prisma.AgentScalarWhereInput | Prisma.AgentScalarWhereInput[];
    OR?: Prisma.AgentScalarWhereInput[];
    NOT?: Prisma.AgentScalarWhereInput | Prisma.AgentScalarWhereInput[];
    id?: Prisma.StringFilter<"Agent"> | string;
    ownerUserId?: Prisma.StringNullableFilter<"Agent"> | string | null;
    name?: Prisma.StringFilter<"Agent"> | string;
    handle?: Prisma.StringFilter<"Agent"> | string;
    bio?: Prisma.StringNullableFilter<"Agent"> | string | null;
    avatarUrl?: Prisma.StringNullableFilter<"Agent"> | string | null;
    systemPrompt?: Prisma.StringFilter<"Agent"> | string;
    modelName?: Prisma.StringFilter<"Agent"> | string;
    safetyLevel?: Prisma.StringFilter<"Agent"> | string;
    isPublic?: Prisma.BoolFilter<"Agent"> | boolean;
    originType?: Prisma.EnumAgentOriginTypeFilter<"Agent"> | $Enums.AgentOriginType;
    createdAt?: Prisma.DateTimeFilter<"Agent"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Agent"> | Date | string;
};
export type AgentCreateWithoutFollowingInput = {
    id?: string;
    name: string;
    handle: string;
    bio?: string | null;
    avatarUrl?: string | null;
    systemPrompt: string;
    modelName: string;
    safetyLevel: string;
    isPublic?: boolean;
    originType: $Enums.AgentOriginType;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    owner?: Prisma.UserCreateNestedOneWithoutAgentsInput;
    posts?: Prisma.PostCreateNestedManyWithoutAuthorInput;
    comments?: Prisma.CommentCreateNestedManyWithoutAuthorInput;
    reactions?: Prisma.ReactionCreateNestedManyWithoutReactorInput;
    followers?: Prisma.FollowCreateNestedManyWithoutFollowedInput;
};
export type AgentUncheckedCreateWithoutFollowingInput = {
    id?: string;
    ownerUserId?: string | null;
    name: string;
    handle: string;
    bio?: string | null;
    avatarUrl?: string | null;
    systemPrompt: string;
    modelName: string;
    safetyLevel: string;
    isPublic?: boolean;
    originType: $Enums.AgentOriginType;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    posts?: Prisma.PostUncheckedCreateNestedManyWithoutAuthorInput;
    comments?: Prisma.CommentUncheckedCreateNestedManyWithoutAuthorInput;
    reactions?: Prisma.ReactionUncheckedCreateNestedManyWithoutReactorInput;
    followers?: Prisma.FollowUncheckedCreateNestedManyWithoutFollowedInput;
};
export type AgentCreateOrConnectWithoutFollowingInput = {
    where: Prisma.AgentWhereUniqueInput;
    create: Prisma.XOR<Prisma.AgentCreateWithoutFollowingInput, Prisma.AgentUncheckedCreateWithoutFollowingInput>;
};
export type AgentCreateWithoutFollowersInput = {
    id?: string;
    name: string;
    handle: string;
    bio?: string | null;
    avatarUrl?: string | null;
    systemPrompt: string;
    modelName: string;
    safetyLevel: string;
    isPublic?: boolean;
    originType: $Enums.AgentOriginType;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    owner?: Prisma.UserCreateNestedOneWithoutAgentsInput;
    posts?: Prisma.PostCreateNestedManyWithoutAuthorInput;
    comments?: Prisma.CommentCreateNestedManyWithoutAuthorInput;
    reactions?: Prisma.ReactionCreateNestedManyWithoutReactorInput;
    following?: Prisma.FollowCreateNestedManyWithoutFollowerInput;
};
export type AgentUncheckedCreateWithoutFollowersInput = {
    id?: string;
    ownerUserId?: string | null;
    name: string;
    handle: string;
    bio?: string | null;
    avatarUrl?: string | null;
    systemPrompt: string;
    modelName: string;
    safetyLevel: string;
    isPublic?: boolean;
    originType: $Enums.AgentOriginType;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    posts?: Prisma.PostUncheckedCreateNestedManyWithoutAuthorInput;
    comments?: Prisma.CommentUncheckedCreateNestedManyWithoutAuthorInput;
    reactions?: Prisma.ReactionUncheckedCreateNestedManyWithoutReactorInput;
    following?: Prisma.FollowUncheckedCreateNestedManyWithoutFollowerInput;
};
export type AgentCreateOrConnectWithoutFollowersInput = {
    where: Prisma.AgentWhereUniqueInput;
    create: Prisma.XOR<Prisma.AgentCreateWithoutFollowersInput, Prisma.AgentUncheckedCreateWithoutFollowersInput>;
};
export type AgentUpsertWithoutFollowingInput = {
    update: Prisma.XOR<Prisma.AgentUpdateWithoutFollowingInput, Prisma.AgentUncheckedUpdateWithoutFollowingInput>;
    create: Prisma.XOR<Prisma.AgentCreateWithoutFollowingInput, Prisma.AgentUncheckedCreateWithoutFollowingInput>;
    where?: Prisma.AgentWhereInput;
};
export type AgentUpdateToOneWithWhereWithoutFollowingInput = {
    where?: Prisma.AgentWhereInput;
    data: Prisma.XOR<Prisma.AgentUpdateWithoutFollowingInput, Prisma.AgentUncheckedUpdateWithoutFollowingInput>;
};
export type AgentUpdateWithoutFollowingInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    handle?: Prisma.StringFieldUpdateOperationsInput | string;
    bio?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    avatarUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    systemPrompt?: Prisma.StringFieldUpdateOperationsInput | string;
    modelName?: Prisma.StringFieldUpdateOperationsInput | string;
    safetyLevel?: Prisma.StringFieldUpdateOperationsInput | string;
    isPublic?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    originType?: Prisma.EnumAgentOriginTypeFieldUpdateOperationsInput | $Enums.AgentOriginType;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    owner?: Prisma.UserUpdateOneWithoutAgentsNestedInput;
    posts?: Prisma.PostUpdateManyWithoutAuthorNestedInput;
    comments?: Prisma.CommentUpdateManyWithoutAuthorNestedInput;
    reactions?: Prisma.ReactionUpdateManyWithoutReactorNestedInput;
    followers?: Prisma.FollowUpdateManyWithoutFollowedNestedInput;
};
export type AgentUncheckedUpdateWithoutFollowingInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    ownerUserId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    handle?: Prisma.StringFieldUpdateOperationsInput | string;
    bio?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    avatarUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    systemPrompt?: Prisma.StringFieldUpdateOperationsInput | string;
    modelName?: Prisma.StringFieldUpdateOperationsInput | string;
    safetyLevel?: Prisma.StringFieldUpdateOperationsInput | string;
    isPublic?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    originType?: Prisma.EnumAgentOriginTypeFieldUpdateOperationsInput | $Enums.AgentOriginType;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    posts?: Prisma.PostUncheckedUpdateManyWithoutAuthorNestedInput;
    comments?: Prisma.CommentUncheckedUpdateManyWithoutAuthorNestedInput;
    reactions?: Prisma.ReactionUncheckedUpdateManyWithoutReactorNestedInput;
    followers?: Prisma.FollowUncheckedUpdateManyWithoutFollowedNestedInput;
};
export type AgentUpsertWithoutFollowersInput = {
    update: Prisma.XOR<Prisma.AgentUpdateWithoutFollowersInput, Prisma.AgentUncheckedUpdateWithoutFollowersInput>;
    create: Prisma.XOR<Prisma.AgentCreateWithoutFollowersInput, Prisma.AgentUncheckedCreateWithoutFollowersInput>;
    where?: Prisma.AgentWhereInput;
};
export type AgentUpdateToOneWithWhereWithoutFollowersInput = {
    where?: Prisma.AgentWhereInput;
    data: Prisma.XOR<Prisma.AgentUpdateWithoutFollowersInput, Prisma.AgentUncheckedUpdateWithoutFollowersInput>;
};
export type AgentUpdateWithoutFollowersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    handle?: Prisma.StringFieldUpdateOperationsInput | string;
    bio?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    avatarUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    systemPrompt?: Prisma.StringFieldUpdateOperationsInput | string;
    modelName?: Prisma.StringFieldUpdateOperationsInput | string;
    safetyLevel?: Prisma.StringFieldUpdateOperationsInput | string;
    isPublic?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    originType?: Prisma.EnumAgentOriginTypeFieldUpdateOperationsInput | $Enums.AgentOriginType;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    owner?: Prisma.UserUpdateOneWithoutAgentsNestedInput;
    posts?: Prisma.PostUpdateManyWithoutAuthorNestedInput;
    comments?: Prisma.CommentUpdateManyWithoutAuthorNestedInput;
    reactions?: Prisma.ReactionUpdateManyWithoutReactorNestedInput;
    following?: Prisma.FollowUpdateManyWithoutFollowerNestedInput;
};
export type AgentUncheckedUpdateWithoutFollowersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    ownerUserId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    handle?: Prisma.StringFieldUpdateOperationsInput | string;
    bio?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    avatarUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    systemPrompt?: Prisma.StringFieldUpdateOperationsInput | string;
    modelName?: Prisma.StringFieldUpdateOperationsInput | string;
    safetyLevel?: Prisma.StringFieldUpdateOperationsInput | string;
    isPublic?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    originType?: Prisma.EnumAgentOriginTypeFieldUpdateOperationsInput | $Enums.AgentOriginType;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    posts?: Prisma.PostUncheckedUpdateManyWithoutAuthorNestedInput;
    comments?: Prisma.CommentUncheckedUpdateManyWithoutAuthorNestedInput;
    reactions?: Prisma.ReactionUncheckedUpdateManyWithoutReactorNestedInput;
    following?: Prisma.FollowUncheckedUpdateManyWithoutFollowerNestedInput;
};
export type AgentCreateWithoutPostsInput = {
    id?: string;
    name: string;
    handle: string;
    bio?: string | null;
    avatarUrl?: string | null;
    systemPrompt: string;
    modelName: string;
    safetyLevel: string;
    isPublic?: boolean;
    originType: $Enums.AgentOriginType;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    owner?: Prisma.UserCreateNestedOneWithoutAgentsInput;
    comments?: Prisma.CommentCreateNestedManyWithoutAuthorInput;
    reactions?: Prisma.ReactionCreateNestedManyWithoutReactorInput;
    following?: Prisma.FollowCreateNestedManyWithoutFollowerInput;
    followers?: Prisma.FollowCreateNestedManyWithoutFollowedInput;
};
export type AgentUncheckedCreateWithoutPostsInput = {
    id?: string;
    ownerUserId?: string | null;
    name: string;
    handle: string;
    bio?: string | null;
    avatarUrl?: string | null;
    systemPrompt: string;
    modelName: string;
    safetyLevel: string;
    isPublic?: boolean;
    originType: $Enums.AgentOriginType;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    comments?: Prisma.CommentUncheckedCreateNestedManyWithoutAuthorInput;
    reactions?: Prisma.ReactionUncheckedCreateNestedManyWithoutReactorInput;
    following?: Prisma.FollowUncheckedCreateNestedManyWithoutFollowerInput;
    followers?: Prisma.FollowUncheckedCreateNestedManyWithoutFollowedInput;
};
export type AgentCreateOrConnectWithoutPostsInput = {
    where: Prisma.AgentWhereUniqueInput;
    create: Prisma.XOR<Prisma.AgentCreateWithoutPostsInput, Prisma.AgentUncheckedCreateWithoutPostsInput>;
};
export type AgentUpsertWithoutPostsInput = {
    update: Prisma.XOR<Prisma.AgentUpdateWithoutPostsInput, Prisma.AgentUncheckedUpdateWithoutPostsInput>;
    create: Prisma.XOR<Prisma.AgentCreateWithoutPostsInput, Prisma.AgentUncheckedCreateWithoutPostsInput>;
    where?: Prisma.AgentWhereInput;
};
export type AgentUpdateToOneWithWhereWithoutPostsInput = {
    where?: Prisma.AgentWhereInput;
    data: Prisma.XOR<Prisma.AgentUpdateWithoutPostsInput, Prisma.AgentUncheckedUpdateWithoutPostsInput>;
};
export type AgentUpdateWithoutPostsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    handle?: Prisma.StringFieldUpdateOperationsInput | string;
    bio?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    avatarUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    systemPrompt?: Prisma.StringFieldUpdateOperationsInput | string;
    modelName?: Prisma.StringFieldUpdateOperationsInput | string;
    safetyLevel?: Prisma.StringFieldUpdateOperationsInput | string;
    isPublic?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    originType?: Prisma.EnumAgentOriginTypeFieldUpdateOperationsInput | $Enums.AgentOriginType;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    owner?: Prisma.UserUpdateOneWithoutAgentsNestedInput;
    comments?: Prisma.CommentUpdateManyWithoutAuthorNestedInput;
    reactions?: Prisma.ReactionUpdateManyWithoutReactorNestedInput;
    following?: Prisma.FollowUpdateManyWithoutFollowerNestedInput;
    followers?: Prisma.FollowUpdateManyWithoutFollowedNestedInput;
};
export type AgentUncheckedUpdateWithoutPostsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    ownerUserId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    handle?: Prisma.StringFieldUpdateOperationsInput | string;
    bio?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    avatarUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    systemPrompt?: Prisma.StringFieldUpdateOperationsInput | string;
    modelName?: Prisma.StringFieldUpdateOperationsInput | string;
    safetyLevel?: Prisma.StringFieldUpdateOperationsInput | string;
    isPublic?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    originType?: Prisma.EnumAgentOriginTypeFieldUpdateOperationsInput | $Enums.AgentOriginType;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    comments?: Prisma.CommentUncheckedUpdateManyWithoutAuthorNestedInput;
    reactions?: Prisma.ReactionUncheckedUpdateManyWithoutReactorNestedInput;
    following?: Prisma.FollowUncheckedUpdateManyWithoutFollowerNestedInput;
    followers?: Prisma.FollowUncheckedUpdateManyWithoutFollowedNestedInput;
};
export type AgentCreateWithoutCommentsInput = {
    id?: string;
    name: string;
    handle: string;
    bio?: string | null;
    avatarUrl?: string | null;
    systemPrompt: string;
    modelName: string;
    safetyLevel: string;
    isPublic?: boolean;
    originType: $Enums.AgentOriginType;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    owner?: Prisma.UserCreateNestedOneWithoutAgentsInput;
    posts?: Prisma.PostCreateNestedManyWithoutAuthorInput;
    reactions?: Prisma.ReactionCreateNestedManyWithoutReactorInput;
    following?: Prisma.FollowCreateNestedManyWithoutFollowerInput;
    followers?: Prisma.FollowCreateNestedManyWithoutFollowedInput;
};
export type AgentUncheckedCreateWithoutCommentsInput = {
    id?: string;
    ownerUserId?: string | null;
    name: string;
    handle: string;
    bio?: string | null;
    avatarUrl?: string | null;
    systemPrompt: string;
    modelName: string;
    safetyLevel: string;
    isPublic?: boolean;
    originType: $Enums.AgentOriginType;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    posts?: Prisma.PostUncheckedCreateNestedManyWithoutAuthorInput;
    reactions?: Prisma.ReactionUncheckedCreateNestedManyWithoutReactorInput;
    following?: Prisma.FollowUncheckedCreateNestedManyWithoutFollowerInput;
    followers?: Prisma.FollowUncheckedCreateNestedManyWithoutFollowedInput;
};
export type AgentCreateOrConnectWithoutCommentsInput = {
    where: Prisma.AgentWhereUniqueInput;
    create: Prisma.XOR<Prisma.AgentCreateWithoutCommentsInput, Prisma.AgentUncheckedCreateWithoutCommentsInput>;
};
export type AgentUpsertWithoutCommentsInput = {
    update: Prisma.XOR<Prisma.AgentUpdateWithoutCommentsInput, Prisma.AgentUncheckedUpdateWithoutCommentsInput>;
    create: Prisma.XOR<Prisma.AgentCreateWithoutCommentsInput, Prisma.AgentUncheckedCreateWithoutCommentsInput>;
    where?: Prisma.AgentWhereInput;
};
export type AgentUpdateToOneWithWhereWithoutCommentsInput = {
    where?: Prisma.AgentWhereInput;
    data: Prisma.XOR<Prisma.AgentUpdateWithoutCommentsInput, Prisma.AgentUncheckedUpdateWithoutCommentsInput>;
};
export type AgentUpdateWithoutCommentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    handle?: Prisma.StringFieldUpdateOperationsInput | string;
    bio?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    avatarUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    systemPrompt?: Prisma.StringFieldUpdateOperationsInput | string;
    modelName?: Prisma.StringFieldUpdateOperationsInput | string;
    safetyLevel?: Prisma.StringFieldUpdateOperationsInput | string;
    isPublic?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    originType?: Prisma.EnumAgentOriginTypeFieldUpdateOperationsInput | $Enums.AgentOriginType;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    owner?: Prisma.UserUpdateOneWithoutAgentsNestedInput;
    posts?: Prisma.PostUpdateManyWithoutAuthorNestedInput;
    reactions?: Prisma.ReactionUpdateManyWithoutReactorNestedInput;
    following?: Prisma.FollowUpdateManyWithoutFollowerNestedInput;
    followers?: Prisma.FollowUpdateManyWithoutFollowedNestedInput;
};
export type AgentUncheckedUpdateWithoutCommentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    ownerUserId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    handle?: Prisma.StringFieldUpdateOperationsInput | string;
    bio?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    avatarUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    systemPrompt?: Prisma.StringFieldUpdateOperationsInput | string;
    modelName?: Prisma.StringFieldUpdateOperationsInput | string;
    safetyLevel?: Prisma.StringFieldUpdateOperationsInput | string;
    isPublic?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    originType?: Prisma.EnumAgentOriginTypeFieldUpdateOperationsInput | $Enums.AgentOriginType;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    posts?: Prisma.PostUncheckedUpdateManyWithoutAuthorNestedInput;
    reactions?: Prisma.ReactionUncheckedUpdateManyWithoutReactorNestedInput;
    following?: Prisma.FollowUncheckedUpdateManyWithoutFollowerNestedInput;
    followers?: Prisma.FollowUncheckedUpdateManyWithoutFollowedNestedInput;
};
export type AgentCreateWithoutReactionsInput = {
    id?: string;
    name: string;
    handle: string;
    bio?: string | null;
    avatarUrl?: string | null;
    systemPrompt: string;
    modelName: string;
    safetyLevel: string;
    isPublic?: boolean;
    originType: $Enums.AgentOriginType;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    owner?: Prisma.UserCreateNestedOneWithoutAgentsInput;
    posts?: Prisma.PostCreateNestedManyWithoutAuthorInput;
    comments?: Prisma.CommentCreateNestedManyWithoutAuthorInput;
    following?: Prisma.FollowCreateNestedManyWithoutFollowerInput;
    followers?: Prisma.FollowCreateNestedManyWithoutFollowedInput;
};
export type AgentUncheckedCreateWithoutReactionsInput = {
    id?: string;
    ownerUserId?: string | null;
    name: string;
    handle: string;
    bio?: string | null;
    avatarUrl?: string | null;
    systemPrompt: string;
    modelName: string;
    safetyLevel: string;
    isPublic?: boolean;
    originType: $Enums.AgentOriginType;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    posts?: Prisma.PostUncheckedCreateNestedManyWithoutAuthorInput;
    comments?: Prisma.CommentUncheckedCreateNestedManyWithoutAuthorInput;
    following?: Prisma.FollowUncheckedCreateNestedManyWithoutFollowerInput;
    followers?: Prisma.FollowUncheckedCreateNestedManyWithoutFollowedInput;
};
export type AgentCreateOrConnectWithoutReactionsInput = {
    where: Prisma.AgentWhereUniqueInput;
    create: Prisma.XOR<Prisma.AgentCreateWithoutReactionsInput, Prisma.AgentUncheckedCreateWithoutReactionsInput>;
};
export type AgentUpsertWithoutReactionsInput = {
    update: Prisma.XOR<Prisma.AgentUpdateWithoutReactionsInput, Prisma.AgentUncheckedUpdateWithoutReactionsInput>;
    create: Prisma.XOR<Prisma.AgentCreateWithoutReactionsInput, Prisma.AgentUncheckedCreateWithoutReactionsInput>;
    where?: Prisma.AgentWhereInput;
};
export type AgentUpdateToOneWithWhereWithoutReactionsInput = {
    where?: Prisma.AgentWhereInput;
    data: Prisma.XOR<Prisma.AgentUpdateWithoutReactionsInput, Prisma.AgentUncheckedUpdateWithoutReactionsInput>;
};
export type AgentUpdateWithoutReactionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    handle?: Prisma.StringFieldUpdateOperationsInput | string;
    bio?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    avatarUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    systemPrompt?: Prisma.StringFieldUpdateOperationsInput | string;
    modelName?: Prisma.StringFieldUpdateOperationsInput | string;
    safetyLevel?: Prisma.StringFieldUpdateOperationsInput | string;
    isPublic?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    originType?: Prisma.EnumAgentOriginTypeFieldUpdateOperationsInput | $Enums.AgentOriginType;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    owner?: Prisma.UserUpdateOneWithoutAgentsNestedInput;
    posts?: Prisma.PostUpdateManyWithoutAuthorNestedInput;
    comments?: Prisma.CommentUpdateManyWithoutAuthorNestedInput;
    following?: Prisma.FollowUpdateManyWithoutFollowerNestedInput;
    followers?: Prisma.FollowUpdateManyWithoutFollowedNestedInput;
};
export type AgentUncheckedUpdateWithoutReactionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    ownerUserId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    handle?: Prisma.StringFieldUpdateOperationsInput | string;
    bio?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    avatarUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    systemPrompt?: Prisma.StringFieldUpdateOperationsInput | string;
    modelName?: Prisma.StringFieldUpdateOperationsInput | string;
    safetyLevel?: Prisma.StringFieldUpdateOperationsInput | string;
    isPublic?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    originType?: Prisma.EnumAgentOriginTypeFieldUpdateOperationsInput | $Enums.AgentOriginType;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    posts?: Prisma.PostUncheckedUpdateManyWithoutAuthorNestedInput;
    comments?: Prisma.CommentUncheckedUpdateManyWithoutAuthorNestedInput;
    following?: Prisma.FollowUncheckedUpdateManyWithoutFollowerNestedInput;
    followers?: Prisma.FollowUncheckedUpdateManyWithoutFollowedNestedInput;
};
export type AgentCreateManyOwnerInput = {
    id?: string;
    name: string;
    handle: string;
    bio?: string | null;
    avatarUrl?: string | null;
    systemPrompt: string;
    modelName: string;
    safetyLevel: string;
    isPublic?: boolean;
    originType: $Enums.AgentOriginType;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type AgentUpdateWithoutOwnerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    handle?: Prisma.StringFieldUpdateOperationsInput | string;
    bio?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    avatarUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    systemPrompt?: Prisma.StringFieldUpdateOperationsInput | string;
    modelName?: Prisma.StringFieldUpdateOperationsInput | string;
    safetyLevel?: Prisma.StringFieldUpdateOperationsInput | string;
    isPublic?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    originType?: Prisma.EnumAgentOriginTypeFieldUpdateOperationsInput | $Enums.AgentOriginType;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    posts?: Prisma.PostUpdateManyWithoutAuthorNestedInput;
    comments?: Prisma.CommentUpdateManyWithoutAuthorNestedInput;
    reactions?: Prisma.ReactionUpdateManyWithoutReactorNestedInput;
    following?: Prisma.FollowUpdateManyWithoutFollowerNestedInput;
    followers?: Prisma.FollowUpdateManyWithoutFollowedNestedInput;
};
export type AgentUncheckedUpdateWithoutOwnerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    handle?: Prisma.StringFieldUpdateOperationsInput | string;
    bio?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    avatarUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    systemPrompt?: Prisma.StringFieldUpdateOperationsInput | string;
    modelName?: Prisma.StringFieldUpdateOperationsInput | string;
    safetyLevel?: Prisma.StringFieldUpdateOperationsInput | string;
    isPublic?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    originType?: Prisma.EnumAgentOriginTypeFieldUpdateOperationsInput | $Enums.AgentOriginType;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    posts?: Prisma.PostUncheckedUpdateManyWithoutAuthorNestedInput;
    comments?: Prisma.CommentUncheckedUpdateManyWithoutAuthorNestedInput;
    reactions?: Prisma.ReactionUncheckedUpdateManyWithoutReactorNestedInput;
    following?: Prisma.FollowUncheckedUpdateManyWithoutFollowerNestedInput;
    followers?: Prisma.FollowUncheckedUpdateManyWithoutFollowedNestedInput;
};
export type AgentUncheckedUpdateManyWithoutOwnerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    handle?: Prisma.StringFieldUpdateOperationsInput | string;
    bio?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    avatarUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    systemPrompt?: Prisma.StringFieldUpdateOperationsInput | string;
    modelName?: Prisma.StringFieldUpdateOperationsInput | string;
    safetyLevel?: Prisma.StringFieldUpdateOperationsInput | string;
    isPublic?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    originType?: Prisma.EnumAgentOriginTypeFieldUpdateOperationsInput | $Enums.AgentOriginType;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
/**
 * Count Type AgentCountOutputType
 */
export type AgentCountOutputType = {
    posts: number;
    comments: number;
    reactions: number;
    following: number;
    followers: number;
};
export type AgentCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    posts?: boolean | AgentCountOutputTypeCountPostsArgs;
    comments?: boolean | AgentCountOutputTypeCountCommentsArgs;
    reactions?: boolean | AgentCountOutputTypeCountReactionsArgs;
    following?: boolean | AgentCountOutputTypeCountFollowingArgs;
    followers?: boolean | AgentCountOutputTypeCountFollowersArgs;
};
/**
 * AgentCountOutputType without action
 */
export type AgentCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentCountOutputType
     */
    select?: Prisma.AgentCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * AgentCountOutputType without action
 */
export type AgentCountOutputTypeCountPostsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PostWhereInput;
};
/**
 * AgentCountOutputType without action
 */
export type AgentCountOutputTypeCountCommentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CommentWhereInput;
};
/**
 * AgentCountOutputType without action
 */
export type AgentCountOutputTypeCountReactionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ReactionWhereInput;
};
/**
 * AgentCountOutputType without action
 */
export type AgentCountOutputTypeCountFollowingArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FollowWhereInput;
};
/**
 * AgentCountOutputType without action
 */
export type AgentCountOutputTypeCountFollowersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FollowWhereInput;
};
export type AgentSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    ownerUserId?: boolean;
    name?: boolean;
    handle?: boolean;
    bio?: boolean;
    avatarUrl?: boolean;
    systemPrompt?: boolean;
    modelName?: boolean;
    safetyLevel?: boolean;
    isPublic?: boolean;
    originType?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    owner?: boolean | Prisma.Agent$ownerArgs<ExtArgs>;
    posts?: boolean | Prisma.Agent$postsArgs<ExtArgs>;
    comments?: boolean | Prisma.Agent$commentsArgs<ExtArgs>;
    reactions?: boolean | Prisma.Agent$reactionsArgs<ExtArgs>;
    following?: boolean | Prisma.Agent$followingArgs<ExtArgs>;
    followers?: boolean | Prisma.Agent$followersArgs<ExtArgs>;
    _count?: boolean | Prisma.AgentCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["agent"]>;
export type AgentSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    ownerUserId?: boolean;
    name?: boolean;
    handle?: boolean;
    bio?: boolean;
    avatarUrl?: boolean;
    systemPrompt?: boolean;
    modelName?: boolean;
    safetyLevel?: boolean;
    isPublic?: boolean;
    originType?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    owner?: boolean | Prisma.Agent$ownerArgs<ExtArgs>;
}, ExtArgs["result"]["agent"]>;
export type AgentSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    ownerUserId?: boolean;
    name?: boolean;
    handle?: boolean;
    bio?: boolean;
    avatarUrl?: boolean;
    systemPrompt?: boolean;
    modelName?: boolean;
    safetyLevel?: boolean;
    isPublic?: boolean;
    originType?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    owner?: boolean | Prisma.Agent$ownerArgs<ExtArgs>;
}, ExtArgs["result"]["agent"]>;
export type AgentSelectScalar = {
    id?: boolean;
    ownerUserId?: boolean;
    name?: boolean;
    handle?: boolean;
    bio?: boolean;
    avatarUrl?: boolean;
    systemPrompt?: boolean;
    modelName?: boolean;
    safetyLevel?: boolean;
    isPublic?: boolean;
    originType?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type AgentOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "ownerUserId" | "name" | "handle" | "bio" | "avatarUrl" | "systemPrompt" | "modelName" | "safetyLevel" | "isPublic" | "originType" | "createdAt" | "updatedAt", ExtArgs["result"]["agent"]>;
export type AgentInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    owner?: boolean | Prisma.Agent$ownerArgs<ExtArgs>;
    posts?: boolean | Prisma.Agent$postsArgs<ExtArgs>;
    comments?: boolean | Prisma.Agent$commentsArgs<ExtArgs>;
    reactions?: boolean | Prisma.Agent$reactionsArgs<ExtArgs>;
    following?: boolean | Prisma.Agent$followingArgs<ExtArgs>;
    followers?: boolean | Prisma.Agent$followersArgs<ExtArgs>;
    _count?: boolean | Prisma.AgentCountOutputTypeDefaultArgs<ExtArgs>;
};
export type AgentIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    owner?: boolean | Prisma.Agent$ownerArgs<ExtArgs>;
};
export type AgentIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    owner?: boolean | Prisma.Agent$ownerArgs<ExtArgs>;
};
export type $AgentPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Agent";
    objects: {
        owner: Prisma.$UserPayload<ExtArgs> | null;
        posts: Prisma.$PostPayload<ExtArgs>[];
        comments: Prisma.$CommentPayload<ExtArgs>[];
        reactions: Prisma.$ReactionPayload<ExtArgs>[];
        following: Prisma.$FollowPayload<ExtArgs>[];
        followers: Prisma.$FollowPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        ownerUserId: string | null;
        name: string;
        handle: string;
        bio: string | null;
        avatarUrl: string | null;
        systemPrompt: string;
        modelName: string;
        safetyLevel: string;
        isPublic: boolean;
        originType: $Enums.AgentOriginType;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["agent"]>;
    composites: {};
};
export type AgentGetPayload<S extends boolean | null | undefined | AgentDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$AgentPayload, S>;
export type AgentCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<AgentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: AgentCountAggregateInputType | true;
};
export interface AgentDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Agent'];
        meta: {
            name: 'Agent';
        };
    };
    /**
     * Find zero or one Agent that matches the filter.
     * @param {AgentFindUniqueArgs} args - Arguments to find a Agent
     * @example
     * // Get one Agent
     * const agent = await prisma.agent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AgentFindUniqueArgs>(args: Prisma.SelectSubset<T, AgentFindUniqueArgs<ExtArgs>>): Prisma.Prisma__AgentClient<runtime.Types.Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Agent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AgentFindUniqueOrThrowArgs} args - Arguments to find a Agent
     * @example
     * // Get one Agent
     * const agent = await prisma.agent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AgentFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, AgentFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__AgentClient<runtime.Types.Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Agent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentFindFirstArgs} args - Arguments to find a Agent
     * @example
     * // Get one Agent
     * const agent = await prisma.agent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AgentFindFirstArgs>(args?: Prisma.SelectSubset<T, AgentFindFirstArgs<ExtArgs>>): Prisma.Prisma__AgentClient<runtime.Types.Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Agent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentFindFirstOrThrowArgs} args - Arguments to find a Agent
     * @example
     * // Get one Agent
     * const agent = await prisma.agent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AgentFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, AgentFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__AgentClient<runtime.Types.Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Agents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Agents
     * const agents = await prisma.agent.findMany()
     *
     * // Get first 10 Agents
     * const agents = await prisma.agent.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const agentWithIdOnly = await prisma.agent.findMany({ select: { id: true } })
     *
     */
    findMany<T extends AgentFindManyArgs>(args?: Prisma.SelectSubset<T, AgentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Agent.
     * @param {AgentCreateArgs} args - Arguments to create a Agent.
     * @example
     * // Create one Agent
     * const Agent = await prisma.agent.create({
     *   data: {
     *     // ... data to create a Agent
     *   }
     * })
     *
     */
    create<T extends AgentCreateArgs>(args: Prisma.SelectSubset<T, AgentCreateArgs<ExtArgs>>): Prisma.Prisma__AgentClient<runtime.Types.Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Agents.
     * @param {AgentCreateManyArgs} args - Arguments to create many Agents.
     * @example
     * // Create many Agents
     * const agent = await prisma.agent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends AgentCreateManyArgs>(args?: Prisma.SelectSubset<T, AgentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Agents and returns the data saved in the database.
     * @param {AgentCreateManyAndReturnArgs} args - Arguments to create many Agents.
     * @example
     * // Create many Agents
     * const agent = await prisma.agent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Agents and only return the `id`
     * const agentWithIdOnly = await prisma.agent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends AgentCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, AgentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Agent.
     * @param {AgentDeleteArgs} args - Arguments to delete one Agent.
     * @example
     * // Delete one Agent
     * const Agent = await prisma.agent.delete({
     *   where: {
     *     // ... filter to delete one Agent
     *   }
     * })
     *
     */
    delete<T extends AgentDeleteArgs>(args: Prisma.SelectSubset<T, AgentDeleteArgs<ExtArgs>>): Prisma.Prisma__AgentClient<runtime.Types.Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Agent.
     * @param {AgentUpdateArgs} args - Arguments to update one Agent.
     * @example
     * // Update one Agent
     * const agent = await prisma.agent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends AgentUpdateArgs>(args: Prisma.SelectSubset<T, AgentUpdateArgs<ExtArgs>>): Prisma.Prisma__AgentClient<runtime.Types.Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Agents.
     * @param {AgentDeleteManyArgs} args - Arguments to filter Agents to delete.
     * @example
     * // Delete a few Agents
     * const { count } = await prisma.agent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends AgentDeleteManyArgs>(args?: Prisma.SelectSubset<T, AgentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Agents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Agents
     * const agent = await prisma.agent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends AgentUpdateManyArgs>(args: Prisma.SelectSubset<T, AgentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Agents and returns the data updated in the database.
     * @param {AgentUpdateManyAndReturnArgs} args - Arguments to update many Agents.
     * @example
     * // Update many Agents
     * const agent = await prisma.agent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Agents and only return the `id`
     * const agentWithIdOnly = await prisma.agent.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends AgentUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, AgentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Agent.
     * @param {AgentUpsertArgs} args - Arguments to update or create a Agent.
     * @example
     * // Update or create a Agent
     * const agent = await prisma.agent.upsert({
     *   create: {
     *     // ... data to create a Agent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Agent we want to update
     *   }
     * })
     */
    upsert<T extends AgentUpsertArgs>(args: Prisma.SelectSubset<T, AgentUpsertArgs<ExtArgs>>): Prisma.Prisma__AgentClient<runtime.Types.Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Agents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentCountArgs} args - Arguments to filter Agents to count.
     * @example
     * // Count the number of Agents
     * const count = await prisma.agent.count({
     *   where: {
     *     // ... the filter for the Agents we want to count
     *   }
     * })
    **/
    count<T extends AgentCountArgs>(args?: Prisma.Subset<T, AgentCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], AgentCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Agent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AgentAggregateArgs>(args: Prisma.Subset<T, AgentAggregateArgs>): Prisma.PrismaPromise<GetAgentAggregateType<T>>;
    /**
     * Group by Agent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
    **/
    groupBy<T extends AgentGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: AgentGroupByArgs['orderBy'];
    } : {
        orderBy?: AgentGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, AgentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAgentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Agent model
     */
    readonly fields: AgentFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for Agent.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__AgentClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    owner<T extends Prisma.Agent$ownerArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Agent$ownerArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    posts<T extends Prisma.Agent$postsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Agent$postsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    comments<T extends Prisma.Agent$commentsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Agent$commentsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    reactions<T extends Prisma.Agent$reactionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Agent$reactionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    following<T extends Prisma.Agent$followingArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Agent$followingArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    followers<T extends Prisma.Agent$followersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Agent$followersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
/**
 * Fields of the Agent model
 */
export interface AgentFieldRefs {
    readonly id: Prisma.FieldRef<"Agent", 'String'>;
    readonly ownerUserId: Prisma.FieldRef<"Agent", 'String'>;
    readonly name: Prisma.FieldRef<"Agent", 'String'>;
    readonly handle: Prisma.FieldRef<"Agent", 'String'>;
    readonly bio: Prisma.FieldRef<"Agent", 'String'>;
    readonly avatarUrl: Prisma.FieldRef<"Agent", 'String'>;
    readonly systemPrompt: Prisma.FieldRef<"Agent", 'String'>;
    readonly modelName: Prisma.FieldRef<"Agent", 'String'>;
    readonly safetyLevel: Prisma.FieldRef<"Agent", 'String'>;
    readonly isPublic: Prisma.FieldRef<"Agent", 'Boolean'>;
    readonly originType: Prisma.FieldRef<"Agent", 'AgentOriginType'>;
    readonly createdAt: Prisma.FieldRef<"Agent", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Agent", 'DateTime'>;
}
/**
 * Agent findUnique
 */
export type AgentFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: Prisma.AgentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Agent
     */
    omit?: Prisma.AgentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AgentInclude<ExtArgs> | null;
    /**
     * Filter, which Agent to fetch.
     */
    where: Prisma.AgentWhereUniqueInput;
};
/**
 * Agent findUniqueOrThrow
 */
export type AgentFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: Prisma.AgentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Agent
     */
    omit?: Prisma.AgentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AgentInclude<ExtArgs> | null;
    /**
     * Filter, which Agent to fetch.
     */
    where: Prisma.AgentWhereUniqueInput;
};
/**
 * Agent findFirst
 */
export type AgentFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: Prisma.AgentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Agent
     */
    omit?: Prisma.AgentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AgentInclude<ExtArgs> | null;
    /**
     * Filter, which Agent to fetch.
     */
    where?: Prisma.AgentWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Agents to fetch.
     */
    orderBy?: Prisma.AgentOrderByWithRelationInput | Prisma.AgentOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Agents.
     */
    cursor?: Prisma.AgentWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Agents from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Agents.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Agents.
     */
    distinct?: Prisma.AgentScalarFieldEnum | Prisma.AgentScalarFieldEnum[];
};
/**
 * Agent findFirstOrThrow
 */
export type AgentFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: Prisma.AgentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Agent
     */
    omit?: Prisma.AgentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AgentInclude<ExtArgs> | null;
    /**
     * Filter, which Agent to fetch.
     */
    where?: Prisma.AgentWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Agents to fetch.
     */
    orderBy?: Prisma.AgentOrderByWithRelationInput | Prisma.AgentOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Agents.
     */
    cursor?: Prisma.AgentWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Agents from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Agents.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Agents.
     */
    distinct?: Prisma.AgentScalarFieldEnum | Prisma.AgentScalarFieldEnum[];
};
/**
 * Agent findMany
 */
export type AgentFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: Prisma.AgentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Agent
     */
    omit?: Prisma.AgentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AgentInclude<ExtArgs> | null;
    /**
     * Filter, which Agents to fetch.
     */
    where?: Prisma.AgentWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Agents to fetch.
     */
    orderBy?: Prisma.AgentOrderByWithRelationInput | Prisma.AgentOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Agents.
     */
    cursor?: Prisma.AgentWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Agents from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Agents.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Agents.
     */
    distinct?: Prisma.AgentScalarFieldEnum | Prisma.AgentScalarFieldEnum[];
};
/**
 * Agent create
 */
export type AgentCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: Prisma.AgentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Agent
     */
    omit?: Prisma.AgentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AgentInclude<ExtArgs> | null;
    /**
     * The data needed to create a Agent.
     */
    data: Prisma.XOR<Prisma.AgentCreateInput, Prisma.AgentUncheckedCreateInput>;
};
/**
 * Agent createMany
 */
export type AgentCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Agents.
     */
    data: Prisma.AgentCreateManyInput | Prisma.AgentCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * Agent createManyAndReturn
 */
export type AgentCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: Prisma.AgentSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Agent
     */
    omit?: Prisma.AgentOmit<ExtArgs> | null;
    /**
     * The data used to create many Agents.
     */
    data: Prisma.AgentCreateManyInput | Prisma.AgentCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AgentIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * Agent update
 */
export type AgentUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: Prisma.AgentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Agent
     */
    omit?: Prisma.AgentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AgentInclude<ExtArgs> | null;
    /**
     * The data needed to update a Agent.
     */
    data: Prisma.XOR<Prisma.AgentUpdateInput, Prisma.AgentUncheckedUpdateInput>;
    /**
     * Choose, which Agent to update.
     */
    where: Prisma.AgentWhereUniqueInput;
};
/**
 * Agent updateMany
 */
export type AgentUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Agents.
     */
    data: Prisma.XOR<Prisma.AgentUpdateManyMutationInput, Prisma.AgentUncheckedUpdateManyInput>;
    /**
     * Filter which Agents to update
     */
    where?: Prisma.AgentWhereInput;
    /**
     * Limit how many Agents to update.
     */
    limit?: number;
};
/**
 * Agent updateManyAndReturn
 */
export type AgentUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: Prisma.AgentSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Agent
     */
    omit?: Prisma.AgentOmit<ExtArgs> | null;
    /**
     * The data used to update Agents.
     */
    data: Prisma.XOR<Prisma.AgentUpdateManyMutationInput, Prisma.AgentUncheckedUpdateManyInput>;
    /**
     * Filter which Agents to update
     */
    where?: Prisma.AgentWhereInput;
    /**
     * Limit how many Agents to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AgentIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * Agent upsert
 */
export type AgentUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: Prisma.AgentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Agent
     */
    omit?: Prisma.AgentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AgentInclude<ExtArgs> | null;
    /**
     * The filter to search for the Agent to update in case it exists.
     */
    where: Prisma.AgentWhereUniqueInput;
    /**
     * In case the Agent found by the `where` argument doesn't exist, create a new Agent with this data.
     */
    create: Prisma.XOR<Prisma.AgentCreateInput, Prisma.AgentUncheckedCreateInput>;
    /**
     * In case the Agent was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.AgentUpdateInput, Prisma.AgentUncheckedUpdateInput>;
};
/**
 * Agent delete
 */
export type AgentDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: Prisma.AgentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Agent
     */
    omit?: Prisma.AgentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AgentInclude<ExtArgs> | null;
    /**
     * Filter which Agent to delete.
     */
    where: Prisma.AgentWhereUniqueInput;
};
/**
 * Agent deleteMany
 */
export type AgentDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Agents to delete
     */
    where?: Prisma.AgentWhereInput;
    /**
     * Limit how many Agents to delete.
     */
    limit?: number;
};
/**
 * Agent.owner
 */
export type Agent$ownerArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
};
/**
 * Agent.posts
 */
export type Agent$postsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: Prisma.PostSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Post
     */
    omit?: Prisma.PostOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PostInclude<ExtArgs> | null;
    where?: Prisma.PostWhereInput;
    orderBy?: Prisma.PostOrderByWithRelationInput | Prisma.PostOrderByWithRelationInput[];
    cursor?: Prisma.PostWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PostScalarFieldEnum | Prisma.PostScalarFieldEnum[];
};
/**
 * Agent.comments
 */
export type Agent$commentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: Prisma.CommentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Comment
     */
    omit?: Prisma.CommentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.CommentInclude<ExtArgs> | null;
    where?: Prisma.CommentWhereInput;
    orderBy?: Prisma.CommentOrderByWithRelationInput | Prisma.CommentOrderByWithRelationInput[];
    cursor?: Prisma.CommentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CommentScalarFieldEnum | Prisma.CommentScalarFieldEnum[];
};
/**
 * Agent.reactions
 */
export type Agent$reactionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reaction
     */
    select?: Prisma.ReactionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Reaction
     */
    omit?: Prisma.ReactionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ReactionInclude<ExtArgs> | null;
    where?: Prisma.ReactionWhereInput;
    orderBy?: Prisma.ReactionOrderByWithRelationInput | Prisma.ReactionOrderByWithRelationInput[];
    cursor?: Prisma.ReactionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ReactionScalarFieldEnum | Prisma.ReactionScalarFieldEnum[];
};
/**
 * Agent.following
 */
export type Agent$followingArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: Prisma.FollowSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Follow
     */
    omit?: Prisma.FollowOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FollowInclude<ExtArgs> | null;
    where?: Prisma.FollowWhereInput;
    orderBy?: Prisma.FollowOrderByWithRelationInput | Prisma.FollowOrderByWithRelationInput[];
    cursor?: Prisma.FollowWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FollowScalarFieldEnum | Prisma.FollowScalarFieldEnum[];
};
/**
 * Agent.followers
 */
export type Agent$followersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: Prisma.FollowSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Follow
     */
    omit?: Prisma.FollowOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FollowInclude<ExtArgs> | null;
    where?: Prisma.FollowWhereInput;
    orderBy?: Prisma.FollowOrderByWithRelationInput | Prisma.FollowOrderByWithRelationInput[];
    cursor?: Prisma.FollowWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FollowScalarFieldEnum | Prisma.FollowScalarFieldEnum[];
};
/**
 * Agent without action
 */
export type AgentDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: Prisma.AgentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Agent
     */
    omit?: Prisma.AgentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AgentInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=Agent.d.ts.map