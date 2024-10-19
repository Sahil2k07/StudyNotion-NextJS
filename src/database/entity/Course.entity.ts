import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  type Relation,
} from "typeorm";
import { User } from "./User.entity";
import { Category } from "./Category.entity";
import { RatingsAndReviews } from "./RatingsAndReviews.entity";
import { Section } from "./Section.entity";

enum Status {
  DRAFT = "Draft",
  PUBLIC = "Public",
}

@Entity()
export class Course {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  courseName: string;

  @Column({ nullable: false })
  courseDescription: string;

  @ManyToOne(() => Category, (category) => category.courses)
  category: Relation<Category>;

  @OneToMany(() => Section, (section) => section.course)
  courseContent: Relation<Section[]>;

  @ManyToOne(() => User, (user) => user.uploadedCourses)
  instructor: Relation<User>;

  @OneToMany(
    () => RatingsAndReviews,
    (ratingsAndReviews) => ratingsAndReviews.course
  )
  ratingsAndReviews: Relation<RatingsAndReviews[]>;

  @Column("double", { nullable: false })
  price: number;

  @ManyToMany(() => User, (user) => user.courses)
  studentsEnrolled: Relation<User[]>;

  @Column({ nullable: true })
  thumbnail: string;

  @Column("simple-array")
  tag: string[];

  @Column("simple-array")
  instructions: string[];

  @Column()
  whatYouWillLearn: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @Column({
    type: "enum",
    enum: Status,
  })
  status: Status;
}
