import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  type Relation,
} from "typeorm";
import { Section } from "./Section.entity";
import { CourseProgress } from "./CourseProgress.entity";

@Entity()
export class SubSection {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  timeDuration: string;

  @Column()
  description: string;

  @Column()
  videoUrl: string;

  @ManyToOne(() => Section, (section) => section.subSection)
  section: Relation<Section>;

  @ManyToOne(
    () => CourseProgress,
    (courseProgress) => courseProgress.completedVideos
  )
  completedVideos: Relation<CourseProgress>;
}
