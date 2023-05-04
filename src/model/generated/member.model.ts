import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_, OneToMany as OneToMany_} from "typeorm"
import * as marshal from "./marshal"

@Entity_()
export class Member {
    constructor(props?: Partial<Member>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Column_("bytea", {nullable: false})
    address!: Uint8Array

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    balance!: bigint

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    votingWeight!: bigint

    @Index_()
    @ManyToOne_(() => Member, {nullable: true})
    delegate!: Member | undefined | null

    @OneToMany_(() => Member, e => e.delegate)
    delegatedBy!: Member[]

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    lastUpdate!: bigint
}
