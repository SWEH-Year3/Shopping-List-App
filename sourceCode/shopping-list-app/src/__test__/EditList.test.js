import {render,screen} from "@testing-library/react";
import user from "@testing-library/user-event";
import EditList from"../pages/EditList";

test("add card list",()=>{
    const moc=jest.fn();
    render(<EditList updateList={moc}/>);

    const titleInput=screen.getByRole("textbox",{name:/title/i});
    user.click(titleInput);
    user.keyboard("shopping");
    const description=screen.getByRole("textbox",{name:/description/i});
    user.click(description);
    user.keyboard("studing is very borning");
    
    const btnAdd=screen.getByRole("button",{name:/Update List/i});
    user.click(btnAdd);
    
    screen.logTestingPlaygroundURL();

    screen.debug();

    expect(moc).toHaveCalled();
    expect(moc).toHaveCalledWith({name:"shopping",description:"studing is very borning"});
    
})