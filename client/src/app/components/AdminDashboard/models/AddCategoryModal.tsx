import React, { useState, useEffect } from "react";
import { Button, Dialog, DialogContent, DialogContentText, DialogTitle, CircularProgress, Snackbar, Alert, TextField } from "@mui/material";

// Assuming you have a Category type/interface similar to the category one
import { Category } from "@/components/types";

const initialCategoryData = {
	name: "",
	description: "",
};

interface ErrorState {
	[key: string]: string;
}

interface Props {
	open: boolean;
	onClose: () => void;
	onAddCategory: (categoryData: Category) => void;
	selectedCategory?: Category | null;
	onUpdateCategory: (categoryData: Category) => void;
}

const AddCategoryModal: React.FC<Props> = ({ open, onClose, onAddCategory, selectedCategory, onUpdateCategory }) => {
	const [categoryData, setCategoryData] = useState<Category>(selectedCategory || initialCategoryData);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<ErrorState>({});
	const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
	const [snackbarMessage, setSnackbarMessage] = useState<string>("");

	useEffect(() => {
		if (selectedCategory) {
			setCategoryData(selectedCategory);
		} else {
			setCategoryData(initialCategoryData);
		}
	}, [selectedCategory]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setCategoryData({ ...categoryData, [name]: value });
		setError((prevError) => ({
			...prevError,
			[name]: value.trim() === "" ? "This field cannot be empty." : "",
		}));
	};

	const clearForm = () => {
		setCategoryData(initialCategoryData);
		setError({});
		setLoading(false);
	};
	const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/category/` || "http://localhost:8000/api/category/";

	const HEADERS = {
		"Content-Type": "application/json",
	};

	const makeApiCall = async (url: string, method: "GET" | "POST" | "PUT" | "DELETE", data?: object): Promise<Response> => {
		return fetch(url, {
			method,
			headers: HEADERS,
			credentials: "include",
			body: JSON.stringify(data),
		});
	};
	const handleApiResponse = async (response: Response) => {
		if (response.ok) {
			const category = await response.json();
			if (selectedCategory) {
				onUpdateCategory(category);
			} else {
				onAddCategory(category);
			}
			clearForm();
			onClose();
		} else {
			const errorData = await response.json();

			setError(errorData);
			console.log("errorData: ", errorData);
			setSnackbarMessage(errorData.name);
			setIsSnackbarOpen(true);
			console.error("API error:", errorData.message || errorData);
		}
	};
	const handleAddCategory = async () => {
		try {
			setLoading(true);
			const endpoint = selectedCategory ? `${API_URL}${selectedCategory._id}` : API_URL;
			const method = selectedCategory ? "PUT" : "POST";

			const response = await makeApiCall(endpoint, method, categoryData);

			await handleApiResponse(response);
		} catch (error) {
			console.error("Error adding/updating category:", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<Snackbar
				open={isSnackbarOpen}
				autoHideDuration={4000}
				onClose={() => setIsSnackbarOpen(false)}
				anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
			>
				<Alert
					severity="error"
					onClose={() => setIsSnackbarOpen(false)}
				>
					{snackbarMessage}
				</Alert>
			</Snackbar>
			<Dialog
				open={open}
				fullWidth
				onClose={onClose}
			>
				<DialogTitle className="bg-primary-variant text-center uppercase h-18">{selectedCategory ? "Edit Category" : "Add New Category"}</DialogTitle>
				<DialogContent className="bg-dark-surface border-primary-variant border-4">
					<DialogContentText sx={{ my: 2 }}>Please fill in the details of the category.</DialogContentText>
					<DialogContentText
						variant="caption"
						sx={{ m: 2, color: "#D23030" }}
					>
						Fields with * are required.
					</DialogContentText>
					<TextField
						name="name"
						label="Name*"
						autoCapitalize={"first"}
						fullWidth
						value={categoryData.name}
						onChange={handleChange}
						error={!!error.name}
						helperText={error.name || ""}
						sx={{ mb: 2 }}
					/>

					<TextField
						name="description"
						label="Description"
						fullWidth
						multiline
						rows={4}
						value={categoryData.description}
						onChange={handleChange}
						error={!!error.description}
						helperText={error.description || ""}
					/>
				</DialogContent>
				<div className="flex justify-between p-4 bg-primary-variant text-center uppercase h-18">
					<Button
						onClick={clearForm}
						variant="contained"
						color="secondary"
					>
						Clear
					</Button>
					<Button
						onClick={onClose}
						variant="contained"
						color="error"
					>
						Cancel
					</Button>
					<Button
						onClick={handleAddCategory}
						variant="contained"
						color="primary"
						disabled={loading}
					>
						{loading ? <CircularProgress size={24} /> : "Save"}
					</Button>
				</div>
			</Dialog>
		</>
	);
};

export default AddCategoryModal;
