import {render,screen} from "@testing-library/react";
import user from "@testing-library/user-event";
import AddList from"../components/ListCard";

test("add card list",()=>{
    render(<AddList/>);

    const titleInput=screen.getByRole("textbox",{name:/title/i});
    user.click(titleInput);
    user.keyboard("shopping");
    const description=screen.getByRole("textbox",{name:/description/i});
    user.click(description);
    user.keyboard("studing is very borning");
    
    const btnAdd=screen.getByRole("button",{name:/Add List/i});
    user.click(btnAdd);
    
    screen.logTestingPlaygroundURL();

    screen.debug();

    expect(titleInput).toHaveValue("shopping");
    expect(description).toHaveValue("studing is very borning");
    
})