"use client";
import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
  Select,
  MenuItem,
  InputLabel,
  CircularProgress,
  Typography,
  Box,
  SelectChangeEvent,
} from "@mui/material";
import Image from "next/image";
import { categories, districts } from "@/lib/navbar-items";
import { newsData, NewsArticle } from "@/interface/all-interfaces";

interface EditDialogProps {
  articles: NewsArticle;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  handleSelectionTypeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleEditClick: (article: NewsArticle) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>, id: string) => void;
  handleSelectChange: (e:SelectChangeEvent)=>void;
  loading: boolean;
  newsData: newsData;
}

export function EditDialog(props: EditDialogProps) {
  const {
    articles,
    fileInputRef,
    handleChange,
    handleSelectionTypeChange,
    handleEditClick,
    handleFileChange,
    handleSubmit,
    handleSelectChange,
    loading,
    newsData,
  } = props;

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    handleEditClick(articles);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Edit
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Edit News</DialogTitle>

        <form onSubmit={(e) => handleSubmit(e, articles._id)}>
          <DialogContent dividers>
            <TextField
              label="న్యూస్ టైటిల్"
              name="newsTitle"
              fullWidth
              required
              value={newsData.newsTitle}
              onChange={handleChange}
              margin="normal"
            />

            <TextField
              label="కంటెంట్ 1"
              name="box1"
              fullWidth
              required
              multiline
              rows={6}
              value={newsData.content.box1 || newsData.content}
              onChange={handleChange}
              margin="normal"
            />
          {newsData.content.box2 && (
             <TextField
              label="కంటెంట్ 2"
              name="box2"
              fullWidth
              required
              multiline
              rows={6}
              value={newsData.content.box2}
              onChange={handleChange}
              margin="normal"
            />
          )}
            <TextField
              label="Author"
              name="author"
              fullWidth
              required
              value={newsData.author}
              onChange={handleChange}
              margin="normal"
            />

            <FormControl fullWidth margin="normal">
              <Button variant="outlined" component="label">
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleFileChange}
                  ref={fileInputRef}
                />
              </Button>
            </FormControl>

            <Box mt={2}>
              {newsData.image ? (
                <>
                  <Typography variant="body2">Image Preview:</Typography>
                  <Image
                    src={URL.createObjectURL(newsData.image)}
                    alt="Preview"
                    width={128}
                    height={128}
                    className="rounded-md object-cover"
                  />
                </>
              ) : articles.image ? (
                <>
                  <Typography variant="body2">Current Image:</Typography>
                  <Image
                    src={articles.image}
                    alt="Current"
                    width={128}
                    height={128}
                    className="rounded-md object-cover"
                  />
                </>
              ) : null}
            </Box>

            <FormControl component="fieldset" margin="normal">
              <FormLabel>Select Type</FormLabel>
              <RadioGroup
                row
                value={newsData.selectionType}
                onChange={handleSelectionTypeChange}
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
              <FormControl fullWidth margin="normal">
                <InputLabel>District</InputLabel>
                <Select
                  name="district"
                  value={newsData.district}
                  onChange={handleSelectChange}
                  label="District"
                  required
                >
                  {districts.map((item) => (
                    <MenuItem key={item.value} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : (
              <FormControl fullWidth margin="normal">
                <InputLabel>Category</InputLabel>
                <Select
                  name="category"
                  value={newsData.category}
                  onChange={handleSelectChange}
                  label="Category"
                  required
                >
                  {categories.map((item) => (
                    <MenuItem key={item.value} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={22} color="inherit" />
              ) : (
                "Update News"
              )}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
