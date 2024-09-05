export const add_course_rule = {
  cname: [
    { required: true, message: "Course Name cannot be empty", trigger: "blur" },
  ],
  credit: [
    { required: true, message: "Credit cannot be empty", trigger: "blur" },
    { type: "number", message: "Credit needs to be a number", trigger: "blur" },
  ],
  tid: [
    { required: true, message: "Teacher ID cannot be empty", trigger: "blur" },
    {
      min: 12,
      max: 12,
      message: "Teacher ID needs to be 12 digits",
      trigger: "blur",
    },
  ],
  is_open: [
    {
      required: true,
      message: "Please select the open status",
      trigger: "change",
    },
  ],
  type: [
    {
      required: true,
      message: "Please select the course type",
      trigger: "change",
    },
  ],
};
