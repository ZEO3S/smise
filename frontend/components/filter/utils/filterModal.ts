export const generateCategoryId = (category: string, detail: string) => `${category}-${detail}`;

export const formatQueryParam = <Item>(items: Array<Item>, key1: keyof Item, key2: keyof Item) =>
  items
    .map((item) => `${item[key1]},${(item[key2] as string[])?.map((value) => value.split('-').pop()).join(',')}`)
    .join('&');
