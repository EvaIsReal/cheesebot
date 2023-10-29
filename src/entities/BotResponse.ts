import { Entity, EntityRepository, PrimaryKey, Property } from "@mikro-orm/core";
import { CustomBaseEntity } from "./BaseEntity";

@Entity({ customRepository: () => BotResponseRepository })
export class BotResponse extends CustomBaseEntity {
    
    @PrimaryKey({autoincrement: false})
    id!: string;

    @Property()
    message: string;
}

export class BotResponseRepository extends EntityRepository<BotResponse> { 
    
}