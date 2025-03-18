import {render,screen, within} from "@testing-library/react"
import user from "@testing-library/user-event"
import Search from "../pages/Search"
test("test search",()=>{
    const lists=[{title:"esmail",description:"esmail is a good boy"},
        {title:"esmail",description:"esmail is a good boy"},
        {title:"Ahmed",description:"esmail is a good boy"}
    ]
    render(<Search lists={lists}/>)
   const searchName=screen.getByPlaceholderText("Search by name...")
   user.click(searchName);
   user.keyboard("esmail");
   const result=within(screen.getByRole("result")).queryAllByRole("link");
   expect(result).toHaveLength(2);
})