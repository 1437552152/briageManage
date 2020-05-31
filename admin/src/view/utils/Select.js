// 结构状态
export function StructureState(type = 0, status = 0) {
  const arr = [
    { key: "0", value: "良好" },
    { key: "1", value: "一般" },
    { key: "2", value: "较差" }
  ];

  if (!type) {
    return arr;
  }
  if (type == 1) {
    let text = "";
    arr.map(item => {
      if (item.key == status) {
        text = item.value;
      }
    });
    return text;
  }
}

// 最近巡检情况
export function patrolCheckState(type = 0, status) {
  const arr = [
    { key: "0", value: "故障" },
    { key: "1", value: "正常" }
  ];

  if (!type) {
    return arr;
  }
  if (type == 1) {
    let text = "";
    arr.map(item => {
      if (item.key == status) {
        text = item.value;
      }
    });
    return text;
  }
}

// 预警信息
export function waringInfo(type = 0, status) {
  const arr = [
    { key: "0", value: "无" },
    { key: "1", value: "一级预警" },
    { key: "2", value: "二级预警" },
    { key: "3", value: "三级预警" }
  ];

  if (!type) {
    return arr;
  }
  if (type == 1) {
    let text = "";
    arr.map(item => {
      if (item.key == status) {
        text = item.value;
      }
    });
    return text;
  }
}
