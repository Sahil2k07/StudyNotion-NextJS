import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  type Relation,
} from "typeorm";
import { User } from "./User.entity";
import { Course } from "./Course.entity";

@Entity()
export class RatingsAndReviews {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("float")
  rating: number;

  @Column({ nullable: true })
  review: string;

  @ManyToOne(() => User, (user) => user.ratingsAndReviews)
  user: Relation<User>;

  @ManyToOne(() => Course, (course) => course.ratingsAndReviews)
  course: Relation<Course>;
}
