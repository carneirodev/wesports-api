import { Entity, Column, CreateDateColumn, PrimaryColumn } from "typeorm";
import {v4 as uuid} from "uuid";

@Entity("user")
export class User {

    @PrimaryColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    acronym: string;

    @Column()
    team: string;

    @Column()
    email: string;

    @Column()
    lastName: string;

    @Column()
    password: string;

    @CreateDateColumn()
    created_at: Date;

    constructor(){
        if(!this.id){
            this.id = uuid();
        }
    }
}