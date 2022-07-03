import { CommonActions, NavigationContainerRef, StackActions } from "@react-navigation/native";


let navigator : NavigationContainerRef<{}>;

export const setNavigator = (navRef:any) => {
    navigator = navRef
}

export const navigate = (routeName:string, params?:any) => {
    navigator.dispatch(
        CommonActions.navigate(routeName,params)
    )
}

export const reset = (routeName:string, params?:any, routeNames?:any) => {
    navigator.dispatch(
        CommonActions.reset({
            index: 1,
            routes: [
                { name: routeName, params }
            ],
            routeNames: routeNames
        })
    )
}

export const customReset = (index:number,routes:Array<any>) => {
    navigator.dispatch(
        CommonActions.reset({
            index: index,
            routes: routes,
        })
    )
}

export const replace = (routeName:string, params?:any) => {
    navigator.dispatch(
        StackActions.replace(routeName, params)

    )
}

export const goBack = () => {
    navigator.dispatch(
        CommonActions.goBack()
    )
}