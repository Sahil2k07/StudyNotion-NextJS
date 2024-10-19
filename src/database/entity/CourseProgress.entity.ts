import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  type Relation,
} from "typeorm";
import { User } from "./User.entity";
import { SubSection } from "./SubSection.entity";

@Entity()
export class CourseProgress {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  courseId: string;

  @ManyToOne(() => User, (user) => user.courseProgress)
  user: Relation<User>;

  @OneToMany(() => SubSection, (subSection) => subSection.completedVideos)
  completedVideos: Relation<SubSection[]>;
}
