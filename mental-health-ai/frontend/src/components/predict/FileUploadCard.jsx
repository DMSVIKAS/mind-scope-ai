import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UploadCloud, FileText, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

function FileUploadCard({ file, setFile, setText }) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      const selectedFile = acceptedFiles[0];

      if (!selectedFile) return;

      setFile(selectedFile);

      const reader = new FileReader();

      reader.onload = (e) => {
        setText(e.target.result);
      };

      reader.readAsText(selectedFile);
    },
    [setFile, setText]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "text/plain": [".txt"],
    },
    multiple: false,
    onDrop,
  });

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
            <UploadCloud className="h-5 w-5 text-violet-400" />
            Upload Document
          </CardTitle>

          <p className="text-sm text-zinc-300">
            Upload a .txt document for analysis.
          </p>
        </CardHeader>

        <CardContent className="flex-1 flex">
          {!file ? (
            <div
              {...getRootProps()}
              className={`flex-1 flex flex-col items-center justify-center cursor-pointer rounded-xl border-2 border-dashed p-12 text-center transition-all
                ${
                  isDragActive
                    ? "border-violet-500 bg-violet-500/10"
                    : "border-zinc-700 hover:border-violet-500 hover:bg-zinc-800/30"
                }`}
            >
              <input {...getInputProps()} />

              <UploadCloud className="mb-6 h-16 w-16 text-violet-400" />

              <h3 className="text-2xl font-semibold text-white">
                Drag & Drop your file
              </h3>

              <p className="mt-3 text-zinc-400">
                or click to browse
              </p>

              <p className="mt-6 text-xs uppercase tracking-wider text-zinc-500">
                Supported format • TXT
              </p>
            </div>
          ) : (
            <div className="flex flex-1 items-center justify-between rounded-xl border border-zinc-700 bg-zinc-950/50 p-6">
              <div className="flex items-center gap-4">
                <FileText className="h-10 w-10 text-green-500" />

                <div>
                  <h4 className="font-semibold text-white">
                    {file.name}
                  </h4>

                  <p className="text-sm text-zinc-400">
                    {(file.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              </div>

              <Button
                variant="destructive"
                size="icon"
                onClick={() => {
                  setFile(null);
                  setText("");
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}


export default FileUploadCard;