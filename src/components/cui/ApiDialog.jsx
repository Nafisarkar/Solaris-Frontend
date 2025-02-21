import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const ApiDialog = ({
  title,
  description,
  buttonText,
  inputPlaceholder,
  inputValue,
  onInputChange,
  onSubmit,
  isLoading,
  loadingText,
  size = "default",
  additionalInputs,
}) => (
  <Dialog>
    <DialogTrigger asChild>
      <Button
        variant="outline"
        size={size}
        className={cn("w-full", size === "sm" ? "text-xs" : "text-sm")}
        disabled={isLoading}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {buttonText}
      </Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          {/* <Label htmlFor="main-input" className="text-right">
            {inputPlaceholder}
          </Label> */}
          <Input
            id="main-input"
            placeholder={inputPlaceholder}
            value={inputValue}
            onChange={onInputChange}
            className="col-span-3"
          />
        </div>

        {additionalInputs?.map((input, index) => (
          <div key={index} className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor={`input-${index}`} className="text-right">
              {input.placeholder}
            </Label>
            <Input
              id={`input-${index}`}
              placeholder={input.placeholder}
              value={input.value}
              onChange={input.onChange}
              className="col-span-3"
            />
          </div>
        ))}

        {isLoading && (
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            {loadingText}
          </p>
        )}
      </div>
      <DialogFooter>
        <DialogTrigger asChild>
          <Button variant="outline">Cancel</Button>
        </DialogTrigger>
        <Button
          onClick={onSubmit}
          disabled={
            (!inputValue && !additionalInputs?.every((input) => input.value)) ||
            isLoading
          }
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Submit
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);
