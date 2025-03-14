import * as React from "react";
import { Tooltip } from "radix-ui";
import { PlusIcon } from "@radix-ui/react-icons";
import "../styles/AddBtn.css"

const AddBtn = () => {
	return (
		<Tooltip.Provider>
			<Tooltip.Root>
				<Tooltip.Trigger asChild>
					<button className="IconButton">
						<PlusIcon />
					</button>
				</Tooltip.Trigger>
				<Tooltip.Portal>
					<Tooltip.Content
						className="TooltipContent"
						sideOffset={5}
					>
						Add a list
						<Tooltip.Arrow className="fill-white" />
					</Tooltip.Content>
				</Tooltip.Portal>
			</Tooltip.Root>
		</Tooltip.Provider>
	);
};

export default AddBtn;
