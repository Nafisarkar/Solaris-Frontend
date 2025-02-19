import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
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
  submitButtonColor = "blue",
}) => (
  <Dialog>
    <DialogTrigger asChild>
      <Button
        className="w-full h-10 text-sm font-medium" // Standardized button size
        disabled={isLoading}
      >
        {buttonText}
      </Button>
    </DialogTrigger>
    <DialogContent className="mx-4 sm:mx-0 max-w-[90vw] sm:max-w-[425px] text-white p-4 sm:p-6 bg-gray-800/90 backdrop-blur border border-gray-700">
      <DialogHeader className="space-y-2 sm:space-y-3">
        <DialogTitle className="text-lg sm:text-xl ">{title}</DialogTitle>
        <p className="text-sm text-gray-400">{description}</p>
      </DialogHeader>

      <div className="mt-4 sm:mt-6 space-y-4">
        <div className="space-y-2">
          <Input
            placeholder={inputPlaceholder}
            value={inputValue}
            onChange={onInputChange}
            className="w-full bg-gray-700/50 border-gray-600 text-sm sm:text-base h-10 sm:h-11"
          />
          {isLoading && <p className="text-xs text-blue-400">{loadingText}</p>}
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="h-10 text-sm font-medium bg-transparent border-gray-600 hover:bg-gray-700/50"
            >
              Cancel
            </Button>
          </DialogTrigger>
          <Button
            onClick={onSubmit}
            disabled={!inputValue || isLoading}
            className={`h-10 text-sm font-medium `}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : null}
            Submit
          </Button>
        </div>
      </div>
    </DialogContent>
  </Dialog>
);
