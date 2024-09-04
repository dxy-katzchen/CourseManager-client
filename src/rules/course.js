export const add_course_rule = {
  cname: [{ required: true, message: "课程名不得为空", trigger: "blur" }],
  credit: [
    { required: true, message: "学分不得为空", trigger: "blur" },
    { type: "number", message: "学分需要为数字", trigger: "blur" },
  ],
  tid: [
    { required: true, message: "教师工号不得为空", trigger: "blur" },
    { min: 12, max: 12, message: "教师工号需要为12位", trigger: "blur" },
  ],
  is_open: [{ required: true, message: "请选择开放状态", trigger: "change" }],
  type: [{ required: true, message: "请选择课程类别", trigger: "change" }],
};
