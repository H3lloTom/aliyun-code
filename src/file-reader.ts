// @ts-ignore

const path = require("path");
const fs = require("fs");

const TARGET_DIR = path.resolve(__dirname, '../package.json');

class BaseNode {
  public name: string = '';
  constructor(name: string) {
    this.name = name;
  }
  public print() {

  }
}

class BranchNode extends BaseNode {
  private children: BaseNode[] = [];
  public insert(node: BaseNode) {
    this.children.push(node);
  }
  public print() {
    const cTxt = this.children.map(c => c.print()).join('');
    const depth = this.name.split(path.sep).filter(i => !!i).length;
    const l = '&nbsp;&nbsp;';
    if (TARGET_DIR.indexOf(this.name) !== -1) {
      return `<p style="color:cyan;"><strong>${l.repeat(depth)}┗----${path.basename(this.name)}</strong></p>${cTxt}`
    }
    return `<p>${l.repeat(depth)}┗----${path.basename(this.name)}</p>${cTxt}`
  }
}

class LeafNode extends BaseNode {
  public print() {
    const depth = this.name.split(path.sep).filter(i => !!i).length;
    const l = '&nbsp;&nbsp;';
    if (this.name === TARGET_DIR) {
      return `<p style="color:cyan;"><strong>${l.repeat(depth)}┗----${path.basename(this.name)}</strong></p>`
    }
    return `<p>${l.repeat(depth)}┗----${path.basename(this.name)}</p>`
  }
}

async function generateNode(dir: string) {
  // 判断当前目录是否是文件夹或是文件
  const stat = await fs.statSync(dir);
  // 如果是目录
  if (stat.isDirectory()) {
    const node = new BranchNode(dir);
    const dirs = await fs.readdirSync(dir);
    dirs.forEach((d: string) => {
      node.insert(new LeafNode(path.resolve(dir, d)))
    })
    return node;
  }
  if (stat.isFile()) {
    const node = new LeafNode(dir);
    return node;
  }

  return new BranchNode('');

}

async function genPathTree(target: string) {
  const pathDetail = path.parse(target);
  let { root, dir } = pathDetail;
  let tree: BaseNode;

  tree = await generateNode(dir);

  while (dir !== root) {


    dir = path.resolve(dir, '..');
    const node = await generateNode(dir);

    // @ts-ignore
    node.children = node.children.map(c => {
      if (c.name === tree.name) {
        return tree;
      }
      return c;
    })


    tree = node;


  }

  const templateStr = await fs.readFileSync(path.resolve(__dirname, '../public/template.html'), { encoding: 'utf8' })

  const treeStr = tree.print();

  const str = templateStr.replace('{target}', target).replace('{tree}', treeStr);

  await fs.writeFileSync(path.resolve(__dirname, '../public/tree.html'), str);
}


genPathTree(TARGET_DIR);
