import { Button } from "@/components/ui/button"
import {
	Sheet,
	SheetContent,
	SheetTrigger,
	SheetTitle
} from "@/components/ui/sheet"
import MenuAnimation from "./MenuAnimation"
import { Menu } from "lucide-react"

export default function Header() {

	return (
		<div className="fixed top-0 left-0 right-0 z-50 px-4">
			<div className="flex items-center justify-between w-full">
				<h1 className="font-black text-stone-50 text-[37px]">HANNA</h1>
				<Sheet >
					<SheetTrigger asChild>
						<Button size='icon'><Menu className='h-10 w-10' /></Button>
					</SheetTrigger>
					<SheetContent className='transform translate-custom-translate-rotate transition duration-custom-long ease-custom-cubic'>
						<SheetTitle>Menu</SheetTitle>
						<MenuAnimation
							menuItems={["Home", "About", "Concerts", "Contact"]}
						/>
					</SheetContent>
				</Sheet>
			</div>
		</div>
	)
}