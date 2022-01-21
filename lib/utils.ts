import { ScriptFilter, ScriptFilterItem } from './interface';

const SPLIT_TOKEN = '✩';


const utils = {


  /**
   * 根据params列出的属性进行过滤，不区分大小写
   * 如果查询关键词为空，返回原数组
   * @param items
   * @param query
   * @param params
   * @param noResultsItem 如果过滤完没有结果则显示该条目
   * @return {ScriptFilterItem[]}
   */
  filterItemsBy: (items: ScriptFilterItem[],
    query = '',
    params: (keyof Pick<ScriptFilterItem, 'title' | 'subtitle' | 'uid' | 'arg'>)[],
    noResultsItem?: ScriptFilterItem) => {
    query = query.trim();
    if (query) {
      let filterItems = items.filter((item) =>
        // 对于没有该参数属性的，返回true，通过
        params.some((p) => item[p]?.match(new RegExp(query, 'i'))),
      );
      if (filterItems.length === 0 && noResultsItem) {
        return [noResultsItem];
      }
      return filterItems;
    } else {
      return items;
    }
  },

  /**
   * 构建单个项
   * @param item
   */
  buildItem: (item: ScriptFilterItem) => item,

  quickLookUrl4File: (filename: string) => `file://${filename.replace(/\s/g, '%20')}`,

  /**
   * 输出列表
   * @param sf
   */
  printScriptFilter: (sf: ScriptFilter) => {
    console.log(JSON.stringify(sf));
  },

  /**
   * Script item arg为字符串，有时需要多个参数传递，可以使用字符串拼接
   * @param args
   * @return {string}
   */
  joinMultiArg: (...args: (number | string | boolean) []) => args.join(SPLIT_TOKEN),

  /**
   *
   * @param argStr
   * @return {string[]}
   */
  splitMultiArgStr: (argStr: string): string[] => argStr.split(SPLIT_TOKEN),

  /**
   * Mac自带emoji表情支持
   * @see https://support.apple.com/zh-cn/guide/mac-help/mchlp1560/mac
   */
  emoji: {
    checked: '☑️',
    unchecked: '✖️',
  },
};

export default utils;
