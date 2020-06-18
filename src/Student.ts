export class Student {
  private readonly id: string;
  private readonly name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}

// 使用工厂类返回实例，如果传入相同的id，只会返回同一个实例
// 如果传入相同的名字，不同的id，也会返回不同的实例
export class StudentFactory {
  public static map: Map<string, Student> = new Map();
  /**
   * 通过id和姓名来获取实例（每个实例等于一个人，实例相同即为同一个人）
   * @param id id
   * @param name 姓名
   */
  public static getStudent(id: string, name: string) {
    if (this.map.get(id)) {
      return this.map.get(id);
    }
    const student: Student = new Student(id, name);
    this.map.set(id, student);
    return student;
  }
}
