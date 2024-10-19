import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  type Relation,
} from "typeorm";
import { User } from "./User.entity";

enum Gender {
  MALE = "Male",
  FEMALE = "Female",
  OTHERS = "Others",
}

@Entity()
export class Profile {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "enum",
    enum: Gender,
    default: Gender.MALE,
  })
  gender: Gender;

  @Column({ nullable: true, default: "Tell us about yourself" })
  about: string;

  @Column({ default: "Add your DateOfBirth" })
  dateOfBirth: string;

  @OneToOne(() => User, (user) => user.additionalInformation)
  user: Relation<User>;
}
