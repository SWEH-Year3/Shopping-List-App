import {render,screen} from "@testing-library/react"
import user from "@testing-library/user-event"
import AddItem from "../pages/AddItem";

test("Add Item",()=>{
    const moc=jest.fn();
    render(<AddItem addItem={moc}/>)

    const TitleInput=screen.getByPlaceholderText("e.g. Milk");
    user.click(TitleInput);
    user.keyboard("esmail");
    const DescriptionInput=screen.getByPlaceholderText("e.g. Oat milk, 2 Liters");
    user.click(DescriptionInput);
    user.keyboard("esmail is smart");
    const QuantityInput=screen.getByPlaceholderText("e.g. 2");
    user.click(QuantityInput);
    user.keyboard("78");
    const PriceInput=screen.getByPlaceholderText("e.g. 50");
    user.click(PriceInput);
    user.keyboard("999");
    const ImageInput=screen.getByRole("textbox",{name:/img/i})
    user.click(ImageInput);
    user.keyboard("esmail");

    const button= screen.getByRole("button",{name:/Add Item/i})
    user.click(button);

    expect(moc).toHaveBeenCalled();
    expect(TitleInput).toHaveValue("esmail");
    
})