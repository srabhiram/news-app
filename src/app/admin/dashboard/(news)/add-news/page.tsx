"use client";
import { categories, districts } from "@/lib/navbar-items";
import { Addnews } from "@/utils/server-action";
import { Upload } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function AddNewsPage() {
  const [loading, setLoading] = useState(false);
  const [selectionType, setSelectionType] = useState<"district" | "category">(
    "district"
  );
  const [fileName, setFileName] = useState<string | null>(null);
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData(e.currentTarget);
      const newsTitle = data.get("newsTitle") as string;
      const author = data.get("author") as string;
      const content_1 = data.get("content_1") as string;
      const content_2 = data.get("content_2") as string;
      const image = data.get("image") as File;
      const category = data.get("category") as string | null;
      const district = data.get("district") as string | null;

      const res = await Addnews({
        newsTitle,
        author,
        content_1,
        image,
        category,
        district,
        content_2,
      });
      if (res && !res.ok) {
        setLoading(false);
      }
      await router.push("/");
      router.refresh();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ m: 1 }}>
      <div className="bg-white p-2">
        <form
          className="md:w-[500px] p-2 flex flex-col items-center gap-4 mx-auto justify-center"
          onSubmit={handleSubmit}
        >
          <div className="flex gap-6">
            <TextField
              variant="outlined"
              label="News Title"
              name="newsTitle"
              required
            />
            <TextField
              variant="outlined"
              label="Author"
              name="author"
              required
            />
          </div>
          <div className="w-full flex flex-col gap-4">
            <TextField
              variant="outlined"
              label="Main content"
              name="content_1"
              rows={10}
              multiline
              fullWidth
              required
            />

            <TextField
              variant="outlined"
              label="Extra content"
              name="content_2"
              rows={10}
              multiline
              fullWidth
              
            />
          </div>
          <Button
            variant="outlined"
            component="label"
            fullWidth
            sx={{ my: 2 }}
            startIcon={<Upload />}
          >
            Upload Image
            <input
              type="file"
              accept="image/*"
              name="image"
              hidden
              required
              onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
            />
          </Button>
          {fileName && (
            <div style={{ fontSize: 14 }}>Selected file: {fileName}</div>
          )}

          <FormControl component="fieldset" sx={{ mt: 3 }}>
            <FormLabel component="legend">Select Type</FormLabel>
            <RadioGroup
              row
              name="selectionType"
              value={selectionType}
              onChange={(_, value) =>
                setSelectionType(value as "district" | "category")
              }
            >
              <FormControlLabel
                value="district"
                control={<Radio />}
                label="District"
              />
              <FormControlLabel
                value="category"
                control={<Radio />}
                label="Category"
              />
            </RadioGroup>
          </FormControl>

          {selectionType === "district" ? (
            <FormControl fullWidth required margin="normal">
              <InputLabel>District</InputLabel>
              <Select name="district" label="District" defaultValue="">
                {districts.map((d) => (
                  <MenuItem key={d.value} value={d.value}>
                    {d.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : (
            <FormControl fullWidth required margin="normal">
              <InputLabel>Category</InputLabel>
              <Select name="category" label="Category" defaultValue="">
                {categories.map((c) => (
                  <MenuItem key={c.value} value={c.value}>
                    {c.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            fullWidth
            sx={{ mt: 3 }}
            startIcon={
              loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : undefined
            }
          >
            Add News
          </Button>
        </form>
      </div>
    </Box>
  );
}
