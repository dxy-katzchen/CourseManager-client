# 🎓 Front-end of Course Manager

This is the front-end part of the **Course Manager** system. View the back-end part [here](https://github.com/dxy-katzchen/CourseManager-Server).

☁️ The project is deployed on AWS EC2. You can access the live site [here](https://courseManager.sabinalovecat.com).

## 📖 Introduction

`CourseManager` is an Instructional Management System (IMS) that enables managing school activities like course enrollment, grade management, and viewing information for students, teachers, and administrators.

## 🌟 Functionality

The Course Management System has three roles. The following outlines the system's functionality for each role:

### 👩‍🎓 Student

- Enroll and withdraw from courses during the enrollment phase.
- View enrolled courses and grades.
- After the course ends, students can evaluate the course (peer review).

### 👨‍🏫 Teacher

- Grade students after the course ends.
- View the list of courses they teach and the enrolled students.

### 🛠 Admin

- Add, edit, or delete course information.
- Publish announcements.

### 🔧 General Functions

- Edit personal homepage.
- Maintain personal information.
- View Student Affairs announcements.
- View all available courses.

## 🛡 Non-functional Requirements

### 🔐 Authorization

Uses **jsonwebtoken** for access control. After login, a token is generated and sent to the front-end with user information. For each request, the front-end must send the token for identity verification. On the back-end, user information is verified to prevent unauthorized access.
Because jwt could be reverse-engineered, I filtered out the sensitive information like password and email from the jwt payload to ensure the security of the system.

### 🧪 Validation

Both the front-end and back-end adopt a combined approach for validation to enhance program robustness.

- Front-end uses **element-plus** validation components to ensure data legality before form submission.
- Back-end uses **joi** middleware to validate data types from the front-end, ensuring the integrity of critical processes (like insert and update operations).

For detailed validation rules, refer to the code in the `/schema` directory and documentation.

### 🔄 CAPTCHA

Uses **svg-captcha** for CAPTCHA verification. Upon login, users input the CAPTCHA code displayed as an image. A token is issued after successful validation.

### 🔑 Encryption

**bcryptjs** is used to hash passwords before storing them in the database. The passwords cannot be reverse-engineered, by using this client-side encryption strategyto ensure that the passwords are secure.

### 🚦 Route Redirection

Routing guards are used. If the back-end detects an invalid or missing token, the user is redirected to the login page.

## 🛠 Tech Stack

The project follows a front-end and back-end separation model. The primary development language used is **JavaScript**.

### 🖥 Front-end:

- **Framework**: Vue 3.js
- **Component Library**: Element-Plus
- **Network Requests**: Axios
- **Styling**: LESS
- **Build Tool**: Vite
- **State Management**: Pinia, with persistence handled by `pinia-plugin-persist`
- **3D Engine**: Three.js
- **Router**: Vue Router

### 💻 Back-end:

- **Environment**: Node.js v20.17.0
- **Framework**: Express
- **Database**: MySQL 8
- **Request Validation Middleware**: Joi, `express-joi`
- **Password Encryption**: bcryptjs
- **Cross-Origin Handling**: CORS
- **Authentication**: jsonwebtoken, express-jwt
- **Password Recovery and Email**: Nodemailer
- **CAPTCHA**: svg-captcha

## ⚙️ Installation

```bash
npm install
```

## 🚀 start

```cmd
vite
```

## 📜 WalkThrough

### 👩‍🎓 Student

#### 📚 Course enrolment

By selecting the course-> course List in the left side bar, student can view all the courses. They can also filter the courses by course name/ID/type/status/Teacher name.
![](https://s2.loli.net/2024/09/07/49jMRdYmvoSrZh8.png)
Students are not allowed to enroll in courses that are closed.

#### 📑 Course Management

Student can go to course->My courses to view all the courses they have enrolled.
![](https://s2.loli.net/2024/09/07/lRvC3YQOmTKcygf.png)
Students are allowed withdraw from the course before the course status are set to closed by admin.

#### 📊 Course Evaluation

Once the course is closed, students can go to course->My course to evaluate the course.
![](https://s2.loli.net/2024/09/07/UkAJ86qKBwdjulF.png)
Once Evaluated, the evaluation will be shown in the course details.
![](https://s2.loli.net/2024/09/07/xanNbKmLkwjAY9P.png)

### 👨‍🏫 Teacher

#### 📚 Course Management

In the Course->MyCourse section in the left hand side, Teacher can view the courses they are teaching.
By clicking the arrow, the teachers can view the students enrolled in the course.
![](https://s2.loli.net/2024/09/07/BJCWmVR7qKdelb6.png)
When the course is closed, teacher are allowed to score the students.
![](https://s2.loli.net/2024/09/07/WFB7PeTcfIkXYLv.png)
For the course that has not been closed, teacher can only view the students enrolled in the course.

### 🏫 Admin

#### 📚 Course Management

In the Course->Course List section in the left hand side, Admin can add/edit/delete course.
You can also filter the course by course name/ID/Teacher name/Course Status in all roles.
Support

##### ➕ Add course

![](https://s2.loli.net/2024/09/06/spvJArkN513I2Xy.png)
![](https://s2.loli.net/2024/09/06/MgqczrQO34pwJe7.png)

##### 🖊 Edit course

![](https://s2.loli.net/2024/09/06/lwGEJ9hAYRnNKmO.png)

##### ❌ Delete course

![](https://s2.loli.net/2024/09/06/I2viwk1cqUNsj3D.png)

#### 📢 Announcement Management

##### 📝 Create Announcement

In the home page, Click the "Student Affairs -> Create Article" button to publish an announcement.
![](https://s2.loli.net/2024/09/07/NpSkXZGiFRs9gq7.png)

You can paste the image in the editor, it will automatically generate a link. Actually, the image is not uploaded to our server, it's uploaded to an media hosting service powered by https://smms.app

You can upload multiple images, and the first one will be used as the cover. If you don't upload any image, the default image will be used.

After you are ready, hit the "Publish" button. The confirmation dialog will pop up, you will see the cover here, and you can change the cover by click the cover image and select for your local device, a link will be generated automatically.

You should also choose the category of this accouncement.

![](https://s2.loli.net/2024/09/07/SvxWgOR4Nt1YjLG.png)

After you are done, hit the "Publish" button, the announcement will be published, all the members(student,teacher,admin) will see this announcement under the corresponding category on the home page.

![](https://s2.loli.net/2024/09/07/bEDeJYo16xmZl8w.png)

By clicking the title of the announcement, Admin can see the details of the announcement.

![](https://s2.loli.net/2024/09/07/1dZhnm2SYItxRgQ.png)

##### 🖊 Edit Announcement

By clicking the "Edit" button on the announcement, Admin can edit the announcement.

##### ❌ Delete Announcement

By clicking the "Delete" button on the announcement, Admin can delete the announcement. The deleted announcement will be moved to the "Recycle Bin", Admin can restore it or permanently delete it.
![](https://s2.loli.net/2024/09/07/7UIgzSLoMa5TR8Z.png)

### 🌐 General functions

These functions are available to all roles.

#### 🔐 login

![](https://s2.loli.net/2024/09/06/ftdrC7m3hUwMNBO.png)

#### 📝 register

![](https://s2.loli.net/2024/09/06/uIUpsNY8c3SVHKq.png)

#### 🔑 forget password

![](https://s2.loli.net/2024/09/06/ucBIJa1n6SChy49.png)

If you have registered, we will send you an email to reset your password.
![](https://s2.loli.net/2024/09/06/ZzAX5MPKNhiBDjV.png)
Enter the verification code, you will be redirected to the login page.

#### 👤 Profile

![](https://s2.loli.net/2024/09/07/ZYN28IOVMmqac94.png)
Hover the avatar to show the popover, click "Profile" to show the profile page.
In the profile page, click "Edit" to use markdown editor to edit your Personal information.

![](https://s2.loli.net/2024/09/07/q5URFKB6xZ2Cj8m.png)

After editing, click "Submit" to save the changes.

You will see the changes displayed on the profile page.

![](https://s2.loli.net/2024/09/07/QciLCGqvebkXFP4.png)

#### 🏠 Personal Centre

In the home page, hover the avatar to show the popover, click "Personal Centre" to show the personal centre page.

![](https://s2.loli.net/2024/09/07/zd7aiIAy1ln8vFs.png)

by Click the avatar, you can update your avatar.
![](https://s2.loli.net/2024/09/07/4qSEMBAZKpljWyH.png)

You can also modify your email, username and password.

![](https://s2.loli.net/2024/09/07/841KdMlry92OuFh.png)
