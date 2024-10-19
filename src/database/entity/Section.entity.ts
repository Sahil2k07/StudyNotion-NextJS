import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  type Relation,
} from "typeorm";
import { Course } from "./Course.entity";
import { SubSection } from "./SubSection.entity";

@Entity()
export class Section {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  sectionName: string;

  @ManyToOne(() => Course, (course) => course.courseContent)
  course: Relation<Course>;

  @OneToMany(() => SubSection, (subSection) => subSection.section)
  subSection: Relation<SubSection[]>;
}
