import React, { useState } from "react";
import { Button, Grid } from "@mui/material";
import AddCategoryModal from "./models/AddCategoryModal";
import AdminCategoryCard from "./models/AdminCategoryCard";

export interface Category {
	_id?: string;
	name: string;
	description?: string;
	parentCategory?: string; // Assuming categories can have parent categories
	createdAt?: Date;
	updatedAt?: Date;
}

interface CategoryListProps {
	initialCategories: Category[];
}

const CategoryList: React.FC<CategoryListProps> = ({ initialCategories }) => {
	const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

	const [categories, setCategories] = useState<Category[]>(initialCategories);
	const [open, setOpen] = useState(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
	const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handleOpenEdit = (category: React.SetStateAction<Category | null>) => {
		setIsEditModalOpen(true);
		setSelectedCategory(category);
		handleOpen();
	};

	const handleCloseEdit = () => {
		setIsEditModalOpen(false);
		setSelectedCategory(null);
		handleClose();
	};

	const handleAddCategory = async (categoryData: Category) => {
		setCategories([...categories, categoryData]);
		handleClose();
	};

	const handleUpdateCategory = async (categoryData: Category) => {
		setCategories((prevCategories) => {
			return prevCategories.map((category) => (category._id === categoryData._id ? categoryData : category));
		});
	};

	const handleDeleteCategory = (categoryId: string) => {
		const confirmDelete = window.confirm("Are you sure you want to delete this category?");

		if (confirmDelete) {
			fetch(`${API_URL}/api/category/${categoryId}`, {
				credentials: "include",
				method: "DELETE",
			})
				.then((response) => {
					if (response.ok) {
						const updatedCategories = categories.filter((category) => category._id !== categoryId);
						setCategories(updatedCategories);
					} else {
						console.error("Error deleting category:", response.statusText);
					}
				})
				.catch((error) => {
					console.error("Error deleting category:", error);
				});
		}
	};

	return (
		<div className="m-5 rounded-lg pb-12 min-w-[900px]">
			<div className="flex justify-between items-center min-w-[900px]">
				<h3 className="text-3xl text-start uppercase py-8 ml-8">Category Management</h3>
				<Button
					variant="contained"
					color="success"
					onClick={handleOpen}
				>
					Add Category
				</Button>
			</div>

			<Grid
				container
				spacing={2}
			>
				{categories.map((category) => (
					<Grid
						key={category._id}
						item
						md={6}
						sm={12}
					>
						<AdminCategoryCard
							key={category.name}
							category={category}
							handleEdit={handleOpenEdit}
							handleDelete={handleDeleteCategory}
						/>
					</Grid>
				))}
			</Grid>

			{open && (
				<AddCategoryModal
					open={open || isEditModalOpen}
					onClose={handleCloseEdit}
					selectedCategory={selectedCategory}
					onAddCategory={handleAddCategory}
					onUpdateCategory={handleUpdateCategory}
				/>
			)}
		</div>
	);
};

export default CategoryList;
