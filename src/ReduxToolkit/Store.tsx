import { configureStore } from "@reduxjs/toolkit";
import LayoutSlice from "./Reducers/LayoutSlice";
import NumberingWizardSlice from "./Reducers/NumberingWizardSlice";
import StudentWizardSlice from "./Reducers/StudentWizardSlice";
import VerticalWizardSlice from "./Reducers/VerticalWizardSlice";
import FormWizardTwoSlice from "./Reducers/FormWizardTwoSlice";
import TwoFactorSlice from "./Reducers/TwoFactorSlice";
import ProjectSlice from "./Reducers/ProjectSlice";
import ToDoSlice from "./Reducers/ToDoSlice";
import TasksSlice from "./Reducers/TasksSlice";
import BookmarkTabSlice from "./Reducers/BookmarkTabSlice";
import LetterBoxSlice from "./Reducers/LetterBoxSlice";
import ContactSlice from "./Reducers/ContactSlice";
import ProductSlice from "./Reducers/ProductSlice";
import ChatSlice from "./Reducers/ChatSlice";
import FilterSlice from "./Reducers/FilterSlice";
import CartSlice from "./Reducers/CartSlice";
import BookmarkHeaderSlice from "./Reducers/BookmarkHeaderSlice";
import ThemeCustomizerSlice from "./Reducers/ThemeCustomizerSlice";
import UserReducer from "./Reducers/Users/UserSlice";
import VendorTabSlice from "./Reducers/Vendors/VendorTabSlice";
import VendorRegSlice from "./Reducers/Vendors/VendorRegSlice";
import VendorEditSlice from "./Reducers/Vendors/VendorEditSlice";


const Store = configureStore({
  reducer: {
    layout: LayoutSlice,
    numberingWizard: NumberingWizardSlice,
    studentWizard: StudentWizardSlice,
    verticalWizard: VerticalWizardSlice,
    formWizardTwo:FormWizardTwoSlice,
    twoFactor: TwoFactorSlice,
    project:ProjectSlice,
    todo:ToDoSlice,
    tasks:TasksSlice,
    bookmarkTab:BookmarkTabSlice,
    letterBox:LetterBoxSlice,
    contact:ContactSlice, 
    product:ProductSlice,
    chat:ChatSlice,
    filterData: FilterSlice,
    cartData: CartSlice,
    bookmarkHeader:BookmarkHeaderSlice,
    themeCustomizer: ThemeCustomizerSlice,
    user: UserReducer,
    vendorTab: VendorTabSlice,
    vendorReg: VendorRegSlice,
    vendorEdit: VendorEditSlice,
  },
});

export default Store;

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
