import { Entity, Column, CreateDateColumn, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import {v4 as uuid} from "uuid";
import { User } from "./User";

@Entity("schedules")
export class Schedules {
    @PrimaryColumn("uuid")
    id: string;

    @Column("uuid")
    owner_id: string;

    @Column("uuid")
    rival_id?: string;


    @ManyToOne(()=> User)
    @JoinColumn({name: "owner_id"})
    owner: User;

    @ManyToOne(()=> User)
    @JoinColumn({name: "rival_id"})
    rival?: User;

    @Column("timestamp")
    date: Date;
    
    @Column("varchar")
    status: string;

    @CreateDateColumn()
    created_at: Date;

    constructor(){
        if(!this.id){
            this.id = uuid();
        }
    }
}