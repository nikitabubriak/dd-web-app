using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class ModelRefactored : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "0e6e42ad-8f4c-4660-9d2b-c7a25ab2460e");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "440c5213-a170-4f0a-b141-14cdfa2aa3f5");

            migrationBuilder.RenameColumn(
                name: "Type",
                table: "Products",
                newName: "Theme");

            migrationBuilder.RenameColumn(
                name: "PictureUrl",
                table: "Products",
                newName: "Image");

            migrationBuilder.RenameColumn(
                name: "Brand",
                table: "Products",
                newName: "Genre");

            migrationBuilder.AddColumn<string>(
                name: "Developer",
                table: "Products",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<DateOnly>(
                name: "ReleaseDate",
                table: "Products",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateOnly(1, 1, 1));

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "3d2cc798-1e2e-49c2-9828-e15ad76745a7", "a9be13e9-dbc1-4832-bf0b-f3c0782e3a1b", "Member", "MEMBER" },
                    { "b8bc518d-b424-43ce-b21c-8db8a30b1b76", "38fb9377-724d-4f58-9117-36e757ea7263", "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3d2cc798-1e2e-49c2-9828-e15ad76745a7");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b8bc518d-b424-43ce-b21c-8db8a30b1b76");

            migrationBuilder.DropColumn(
                name: "Developer",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "ReleaseDate",
                table: "Products");

            migrationBuilder.RenameColumn(
                name: "Theme",
                table: "Products",
                newName: "Type");

            migrationBuilder.RenameColumn(
                name: "Image",
                table: "Products",
                newName: "PictureUrl");

            migrationBuilder.RenameColumn(
                name: "Genre",
                table: "Products",
                newName: "Brand");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "0e6e42ad-8f4c-4660-9d2b-c7a25ab2460e", "567263b0-4ebb-4e5a-b9c7-b6825b3bc3ed", "Admin", "ADMIN" },
                    { "440c5213-a170-4f0a-b141-14cdfa2aa3f5", "25d3d107-1917-4680-9849-ac15c63bd3e6", "Member", "MEMBER" }
                });
        }
    }
}
