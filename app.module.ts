import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './infrastructure/database/prisma/prisma.module';
import { AuthModule } from './infrastructure/auth/auth.module';
import { UserModule } from './interfaces/controllers/user/user.module';
import { FacultyModule } from './interfaces/controllers/faculty/faculty.module';
import { DepartmentModule } from './interfaces/controllers/department/department.module';
import { CourseModule } from './interfaces/controllers/course/course.module';
import { StudentModule } from './interfaces/controllers/student/student.module';
import { ProfessorModule } from './interfaces/controllers/professor/professor.module';
import { SectionModule } from './interfaces/controllers/section/section.module';
import { CampusModule } from './interfaces/controllers/campus/campus.module';
import { ClassroomModule } from './interfaces/controllers/classroom/classroom.module';
import { TermModule } from './interfaces/controllers/term/term.module';
import { SessionTimeModule } from './interfaces/controllers/session-time/session-time.module';
import { CareerModule } from './interfaces/controllers/career/career.module';
import { CareerCampusModule } from './interfaces/controllers/career-campus/career-campus.module';
import { CoursePrerequisiteModule } from './interfaces/controllers/course-prerequisite/course-prerequisite.module';
import { ApplicationModule } from './interfaces/controllers/application/application.module';
import { ApplicationDocumentModule } from './interfaces/controllers/application-document/application-document.module';
import { ExamModule } from './interfaces/controllers/exam/exam.module';
import { PracticeModule } from './interfaces/controllers/practice/practice.module';
import { AssignmentModule } from './interfaces/controllers/assignment/assignment.module';
import { SubmissionModule } from './interfaces/controllers/submission/submission.module';
import { TeacherRatingModule } from './interfaces/controllers/teacher-rating/teacher-rating.module';
import { ThreadModule } from './interfaces/controllers/thread/thread.module';
import { PostModule } from './interfaces/controllers/post/post.module';
import { NotificationModule } from './interfaces/controllers/notification/notification.module';
import { NotificationRecipientModule } from './interfaces/controllers/notification-recipient/notification-recipient.module';
import { ReportModule } from './interfaces/controllers/report/report.module';
import { UniversityModule } from './interfaces/controllers/university/university.module';
import { PersonModule } from './interfaces/controllers/person/person.module';
import { RoleModule } from './interfaces/controllers/role/role.module';
import { StudentSectionModule } from './interfaces/controllers/student-section/student-section.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    UserModule,
    UniversityModule,
    FacultyModule,
    DepartmentModule,
    CourseModule,
    StudentModule,
    ProfessorModule,
    SectionModule,
    CampusModule,
    ClassroomModule,
    TermModule,
    SessionTimeModule,
    CareerModule,
    CareerCampusModule,
    CoursePrerequisiteModule,
    ApplicationModule,
    ApplicationDocumentModule,
    ExamModule,
    PracticeModule,
    AssignmentModule,
    SubmissionModule,
    TeacherRatingModule,
    ThreadModule,
    PostModule,
    NotificationModule,
    NotificationRecipientModule,
    ReportModule,
    PersonModule,
    RoleModule,
    StudentSectionModule,
  ],
})
export class AppModule {}