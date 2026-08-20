import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Eraser, FileText } from "lucide-react";
import { motion } from "framer-motion";

function TextInputCard({ text, setText }) {
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="h-full bg-zinc-900/80 border-zinc-800 backdrop-blur-xl shadow-xl hover:border-violet-500/40 transition-all duration-300 flex flex-col">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl text-white">
            <FileText className="h-5 w-5 text-violet-400" />
            Enter Text
          </CardTitle>

          <p className="text-sm text-zinc-300">
            Type or paste the text you want to analyze.
          </p>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col gap-4">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Start typing here..."
            className="flex-1 min-h-[320px] resize-none bg-zinc-950 border-zinc-700 text-white placeholder:text-zinc-500 focus-visible:ring-violet-500"
          />

          <div className="flex items-center justify-between">
            <div className="flex gap-5 text-sm text-zinc-400">
              <span>Characters: {text.length}</span>
              <span>Words: {wordCount}</span>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setText("")}
              disabled={!text}
              className="border-zinc-700 hover:bg-red-500 hover:text-white transition-all"
            >
              <Eraser className="mr-2 h-4 w-4" />
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
    
  );
}


export default TextInputCard;