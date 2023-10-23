"use client";
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
import { Plus } from "lucide-react";
import { DatePicker } from "./DatePicker";
import { useLogStore } from "@/store";
import { useToast } from "@/components/ui/use-toast";
import dayjs from "dayjs";

export function NewLog() {
  const { toast } = useToast();
  const log = useLogStore((state) => state.log);
  const setLog = useLogStore((state) => state.setLog);
  const setLogs = useLogStore((state) => state.setLogs);

  const closeDiolog = () => {
    document.getElementById("close-btn")?.click();
  };

  const validateLog = () => {
    if (!log.date || !log.hour || log.hour === 0) {
      throw "Date or Hour cannot be empty";
    } else if (log.hour > 24) {
      throw "Please enter a valid hour";
    }
  };

  const submitLog = () => {
    try {
      validateLog();
      setLogs(log, dayjs(log.date).format("DD-MM-YYYY"));
      toast({
        title: "Log Created Successfully",
        description: `${log.hour} Hours on ${log.date.toDateString()} `,
      });
      closeDiolog();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to create Log",
        description: error as string,
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus />
          Add Log
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Log</DialogTitle>
          <DialogDescription>
            Add a new log with some details and notes.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="data" className="text-right">
              Date
            </Label>
            <DatePicker />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="hour" className="text-right">
              Hour
            </Label>
            <Input
              id="hour"
              type="number"
              placeholder="Enter Hour"
              value={log.hour}
              onChange={(e) =>
                setLog({ ...log, hour: parseInt(e.target.value) })
              }
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="note" className="text-right">
              Note
            </Label>
            <Input
              id="note"
              placeholder="Enter The note of this log"
              value={log.note}
              onChange={(e) => setLog({ ...log, note: e.target.value })}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={submitLog}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
