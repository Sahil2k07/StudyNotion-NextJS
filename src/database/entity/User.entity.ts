import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  type Relation,
  UpdateDateColumn,
} from "typeorm";
import { Profile } from "./Profile.entity";
import { Course } from "./Course.entity";
import { RatingsAndReviews } from "./RatingsAndReviews.entity";
import { CourseProgress } from "./CourseProgress.entity";

enum AccountType {
  ADMIN = "Admin",
  STUDENT = "Student",
  INSTRUCTOR = "Instructor",
}

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column()
  password: string;

  @Column()
  contactNumber: string;

  @Column()
  image: string;

  @Column({ nullable: true })
  verificationOtp: string;

  @Column({ default: false })
  isSignedIn: boolean;

  @OneToOne(() => Profile, (profile) => profile.user)
  @JoinColumn()
  additionalInformation: Relation<Profile>;

  @OneToMany(
    () => RatingsAndReviews,
    (ratingsAndReviews) => ratingsAndReviews.user
  )
  ratingsAndReviews: Relation<RatingsAndReviews[]>;

  @ManyToMany(() => Course, (course) => course.studentsEnrolled)
  @JoinColumn()
  courses: Relation<Course[]>;

  @OneToMany(() => Course, (course) => course.instructor)
  uploadedCourses: Relation<Course[]>;

  @Column({ default: true })
  active: boolean;

  @Column({ default: true })
  approved: boolean;

  @Column({ nullable: true })
  token: string;

  @Column({
    type: "enum",
    enum: AccountType,
  })
  accountType: AccountType;

  @OneToMany(() => CourseProgress, (courseProgress) => courseProgress.user)
  courseProgress: Relation<CourseProgress[]>;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}
