import useSWR from "swr"

function fetcher(url: string) {
  // console.log(url, "url for users")
  return window.fetch(url).then((res) => res.json())
}

export function fetchJSON(url: string, options: object) {
  // console.log(url, "post data")
  return window.fetch(url, options).then((res) => res.json())
}

export function useCategories() {
  const { data, error } = useSWR(`/api/get-categories`, fetcher)

  return {
    categories: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function useCategory(id: string) {
  const { data, error } = useSWR(`/api/get-category?id=${id}`, fetcher)

  return {
    category: data,
    isLoading: !error && !data,
    isError: error,
  }
}

// export function useSubcategoriesViaCategories() {
//   let subcategories, isLoading, isError;
//   function getData(id: any){
//     const { data, error } = useSWR(`/api/get-subcategories-via-category?id=${id}`, fetcher)
//     return {
//       subcategories: data,
//       isLoading: !error && !data,
//       isError: error,
//     }
//   }
//   getData(1)
//   // console.log(data, error, "categories ===> ")
//   return {
//     getData,
//   }}

export function useSubcategoriesViaCategory(id: any) {
  const { data, error } = useSWR(`/api/get-subcategories-via-category?id=${id}`, fetcher)
  // console.log(data, error, "categories ===> ")
  return {
    subcategories: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function useExplanations(id: string) {
  const { data, error } = useSWR(`/api/get-explanations-via-subcategory?id=${id}`, fetcher)

  return {
    explanations: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function useItems(id: string) {
  const { data, error } = useSWR(`/api/get-items-via-subcategory?id=${id}`, fetcher)

  return {
    items: data,
    loading: !error && !data,
    isError: error,
  }
}

export function useBaseData() {
  const { data, error } = useSWR(`/api/get-base`, fetcher)

  return {
    baseData: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function useCatgorySymbol(symbolA: string, symbolB: string, symbolC: string) {
  console.log(symbolC, symbolB, symbolA, "in symbols")
  const { data, error } = useSWR(`/api/get-subcategory-symbols?symbolA=${symbolA}&symbolB=${symbolB}&symbolC=${symbolC}`, fetcher)

  return {
    baseData: data,
    isLoading: !error && !data,
    isError: error,
  }
}

// export function useCreateUser() {
//   const { data, error } = useSWR(`/api/create-user`, fetchJSON)

//   return {
//     baseData: data,
//     isLoading: !error && !data,
//     isError: error,
//   }
// }
