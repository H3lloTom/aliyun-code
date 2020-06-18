import React, { FC, useState, useMemo } from "react";

const data: string[] = [
  "君不见黄河之水天上来",
  "奔流到海不复回",
  "君不见高堂明镜悲白发",
  "朝如青丝暮成雪",
  "人生得意须尽欢",
  "莫使金樽空对月",
  "天生我材必有用",
  "千金散尽还复来",
  "烹羊宰牛且为乐",
  "会须一饮三百杯"
];

function throttle(func: Function, interval: number) {
  let now = performance.now();
  let timer = 0;
  return function(...args: any[]) {
    const time = performance.now();

    if (time - now < interval) {
      window.clearTimeout(timer);
    }
    timer = window.setTimeout(() => {
      func.call(this, ...args);
      now = time;
    }, interval - (time - now));
  };
}

const InputSearch: FC = () => {
  const [result, setResult] = useState(data);
  const [key, setKey] = useState("");
  const throttledSearch = useMemo(
    () =>
      throttle((key: string) => {
        const reg = new RegExp(`${key}`, "g");
        const res = data.filter(d => reg.test(d));
        setResult(res);
        setKey(key);
      }, 100),
    []
  );
  return (
    <div>
      <p>
        <input
          type="text"
          onChange={e => {
            throttledSearch(e.target.value);
          }}
        />
      </p>
      <div>
        <p>搜索结果：{result.length}条</p>
        {result.map((r, index) => {
          if (key) {
            return <p key={index}>{r.replace(key, `<${key}>`)}</p>;
          }
          return <p key={index}>{r}</p>;
        })}
      </div>
    </div>
  );
};

export default InputSearch;
