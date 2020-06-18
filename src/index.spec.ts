import { StudentFactory } from "./Student";

it("id相同，name相同，返回两个相同实例", () => {
  const _student_1 = StudentFactory.getStudent("a", "王强");
  const _student_2 = StudentFactory.getStudent("a", "王强");
  expect(_student_1).toEqual(_student_2);
});
it("id相同，name不同，返回两个相同实例", () => {
  const _student_1 = StudentFactory.getStudent("a", "王强");
  const _student_2 = StudentFactory.getStudent("a", "李四");
  expect(_student_1).toEqual(_student_2);
});
it("id不同，name相同，返回两个不同实例", () => {
  const _student_1 = StudentFactory.getStudent("a", "王强");
  const _student_2 = StudentFactory.getStudent("b", "王强");
  expect(_student_1).not.toEqual(_student_2);
});
it("id不同，name不同，返回两个不同实例", () => {
  const _student_1 = StudentFactory.getStudent("a", "王强");
  const _student_2 = StudentFactory.getStudent("b", "李四");
  expect(_student_1).not.toEqual(_student_2);
});
