// "use client"

import Link from "next/link";
import { Button } from "../ui/button";

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import {
//     Dialog,
//     DialogContent,
//     DialogDescription,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
// } from "@/components/ui/dialog"
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select"
// import { Label } from "@/components/ui/label"

// const ContactDialog = () => {
//     const [role, setRole] = useState("")
//     const [inquiry, setInquiry] = useState("")

//     return (
//         <Dialog>
//             <DialogTrigger asChild>
//                 <Button variant="outline">Open Dialog</Button>
//             </DialogTrigger>
//             <DialogContent className="sm:max-w-[425px] bg-card text-card-foreground border-border p-6">
//                 <DialogHeader className="space-y-1">
//                     <DialogTitle className="text-xl font-semibold tracking-tight">Tell me about yourself</DialogTitle>
//                     <DialogDescription className="text-muted-foreground text-sm">
//                         Please select your inquiry type to continue.
//                     </DialogDescription>
//                 </DialogHeader>
//                 <div className="grid gap-6 py-4">
//                     <div className="grid gap-2">
//                         <Label className="text-sm font-medium text-foreground">Are you a?</Label>
//                         <Select value={role} onValueChange={setRole}>
//                             <SelectTrigger className="w-full bg-muted/50 border-input text-foreground h-11 px-3 focus:ring-ring focus:ring-offset-0">
//                                 <SelectValue placeholder="Select an option..." />
//                             </SelectTrigger>
//                             <SelectContent className="bg-popover border-border text-popover-foreground">
//                                 <SelectItem value="Recruiter" className="cursor-pointer">Recruiter</SelectItem>
//                                 <SelectItem value="Client" className="cursor-pointer">Client</SelectItem>
//                                 <SelectItem value="Developer" className="cursor-pointer">Developer</SelectItem>
//                                 <SelectItem value="Other" className="cursor-pointer">Other</SelectItem>
//                             </SelectContent>
//                         </Select>
//                     </div>
//                     <div className="grid gap-2">
//                         <Label className="text-sm font-medium text-foreground">What's your inquiry about?</Label>
//                         <Select value={inquiry} onValueChange={setInquiry}>
//                             <SelectTrigger className="w-full bg-muted/50 border-input text-foreground h-11 px-3 focus:ring-ring focus:ring-offset-0">
//                                 <SelectValue placeholder="Select an option..." />
//                             </SelectTrigger>
//                             <SelectContent className="bg-popover border-border text-popover-foreground">
//                                 <SelectItem value="Project" className="cursor-pointer">Project</SelectItem>
//                                 <SelectItem value="Job Opportunity" className="cursor-pointer">Job Opportunity</SelectItem>
//                                 <SelectItem value="Collaboration" className="cursor-pointer">Collaboration</SelectItem>
//                                 <SelectItem value="General Question" className="cursor-pointer">General Question</SelectItem>
//                             </SelectContent>
//                         </Select>
//                     </div>
//                 </div>
//                 <div className="relative mt-2">
//                     <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium h-12 rounded-lg text-base">
//                         Continue
//                     </Button>
//                 </div>
//             </DialogContent>
//         </Dialog>
//     );
// };
// export default ContactDialog;

const ContactDialog = () => {
    return (
        <section className="w-full flex flex-col items-center justify-center gap-4 shadow-inner-strong rounded-lg mx-auto px-6 md:px-10 py-6 md:py-12 mt-10">
           <p className="text-muted-foreground">Hey, you scrolled this far, let's talk.</p>
           <Link href='/contact'>
                <Button>Contact Me</Button>
           </Link>
        </section>
    );
};
export default ContactDialog