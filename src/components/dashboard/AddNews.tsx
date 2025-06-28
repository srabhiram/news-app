"use client";
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
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { categories, districts } from "@/lib/navbar-items";
import { CloudUploadIcon } from "lucide-react";

export default function AddNewsPageComponent() {
  const [newsData, setNewsData] = React.useState({
    newsTitle: "",
    content: {
      box1: "",
      box2: "",
    },
    image: null as File | null,
    district: "",
    category: "",
    author: "",
    selectionType: "district" as "district" | "category",
  });

  const [loading, setLoading] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    if (name === "box1" || name === "box2") {
      setNewsData((prev) => ({
        ...prev,
        content: {
          ...prev.content,
          [name]: value,
        },
      }));
    } else {
      setNewsData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSelectionTypeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectionType = e.target.value as "district" | "category";
    setNewsData((prev) => ({
      ...prev,
      selectionType,
      district: selectionType === "category" ? "" : prev.district,
      category: selectionType === "district" ? "" : prev.category,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (file && file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5MB");
      return;
    }

    setNewsData((prev) => ({ ...prev, image: file }));
  };
  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setNewsData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("newsTitle", newsData.newsTitle);
    formData.append("content", JSON.stringify(newsData.content));
    formData.append("image", newsData.image as Blob);
    formData.append("author", newsData.author);
    formData.append("district", newsData.district);
    formData.append("category", newsData.category);

    try {
      setLoading(true);
      const response = await fetch("/api/news/add", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (!response.ok) {
        console.log(data.message || "Something went wrong");
        return;
      }

      setNewsData({
        newsTitle: "",
        content: { box1: "", box2: "" },
        image: null,
        district: "",
        category: "",
        author: "",
        selectionType: "district",
      });
      if (fileInputRef.current) fileInputRef.current.value = "";
      setLoading(false);
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting the form. Please try again.");
    }
  };

  return (
    <Box maxWidth="sm" mx="auto" my={5} px={2}>
      <Typography variant="h5" fontWeight="bold" mb={3} textAlign="center">
        Add News
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="న్యూస్ టైటిల్"
          name="newsTitle"
          value={newsData.newsTitle}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />

        <TextField
          label="కంటెంట్ 1"
          name="box1"
          value={newsData.content.box1}
          onChange={handleChange}
          fullWidth
          multiline
          rows={6}
          required
          margin="normal"
        />

        <TextField
          label="కంటెంట్ 2"
          name="box2"
          value={newsData.content.box2}
          onChange={handleChange}
          fullWidth
          multiline
          rows={6}
          margin="normal"
        />

        <TextField
          label="Author"
          name="author"
          value={newsData.author}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />

        <Button variant="outlined" component="label" fullWidth sx={{ my: 2 }}  startIcon={<CloudUploadIcon />}>
          Upload Image
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleFileChange}
            ref={fileInputRef}
            required
          />
        </Button>

        {newsData.image && (
          <Box my={2}>
            <Typography variant="body2">Image Preview:</Typography>
            <Image
              src={URL.createObjectURL(newsData.image)}
              alt="Preview"
              width={128}
              height={128}
              className="rounded-md object-cover"
            />
          </Box>
        )}

        <FormControl component="fieldset" sx={{ mt: 3 }}>
          <FormLabel component="legend">Select Type</FormLabel>
          <RadioGroup
            row
            value={newsData.selectionType}
            onChange={handleSelectionTypeChange}
            name="selectionType"
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

        {newsData.selectionType === "district" ? (
          <FormControl fullWidth required margin="normal">
            <InputLabel>District</InputLabel>
            <Select
              name="district"
              value={newsData.district}
              label="District"
              onChange={handleSelectChange}
            >
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
            <Select
              name="category"
              value={newsData.category}
              label="Category"
              onChange={handleSelectChange}
            >
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
          fullWidth
          loading = {loading}
          loadingIndicator={<CircularProgress size={24} color="inherit" />}
          sx={{ mt: 3}}
        >
          
            Add News
        
        </Button>
      </form>
    </Box>
  );
}
