﻿namespace CinnamonCare.View
{
    partial class Login
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.tblLbl = new System.Windows.Forms.Label();
            this.htlLbl = new System.Windows.Forms.Label();
            this.tblLblTxt = new System.Windows.Forms.TextBox();
            this.htlLblDrop = new System.Windows.Forms.ComboBox();
            this.btnOk = new System.Windows.Forms.Button();
            this.SuspendLayout();
            // 
            // tblLbl
            // 
            this.tblLbl.AutoSize = true;
            this.tblLbl.Font = new System.Drawing.Font("Microsoft YaHei", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.tblLbl.Location = new System.Drawing.Point(80, 162);
            this.tblLbl.Name = "tblLbl";
            this.tblLbl.Size = new System.Drawing.Size(133, 27);
            this.tblLbl.TabIndex = 1;
            this.tblLbl.Text = "Table name :";
            // 
            // htlLbl
            // 
            this.htlLbl.AutoSize = true;
            this.htlLbl.Font = new System.Drawing.Font("Microsoft YaHei", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.htlLbl.Location = new System.Drawing.Point(80, 228);
            this.htlLbl.Name = "htlLbl";
            this.htlLbl.Size = new System.Drawing.Size(133, 27);
            this.htlLbl.TabIndex = 2;
            this.htlLbl.Text = "Hotel name :";
            // 
            // tblLblTxt
            // 
            this.tblLblTxt.Location = new System.Drawing.Point(280, 167);
            this.tblLblTxt.Name = "tblLblTxt";
            this.tblLblTxt.Size = new System.Drawing.Size(274, 22);
            this.tblLblTxt.TabIndex = 4;
            // 
            // htlLblDrop
            // 
            this.htlLblDrop.FormattingEnabled = true;
            this.htlLblDrop.Location = new System.Drawing.Point(280, 229);
            this.htlLblDrop.Name = "htlLblDrop";
            this.htlLblDrop.Size = new System.Drawing.Size(274, 24);
            this.htlLblDrop.TabIndex = 5;
            // 
            // btnOk
            // 
            this.btnOk.Location = new System.Drawing.Point(518, 400);
            this.btnOk.Name = "btnOk";
            this.btnOk.Size = new System.Drawing.Size(107, 41);
            this.btnOk.TabIndex = 6;
            this.btnOk.Text = "OK";
            this.btnOk.UseVisualStyleBackColor = true;
            this.btnOk.Click += new System.EventHandler(this.btnOk_Click);
            // 
            // Login
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(725, 510);
            this.Controls.Add(this.btnOk);
            this.Controls.Add(this.htlLblDrop);
            this.Controls.Add(this.tblLblTxt);
            this.Controls.Add(this.htlLbl);
            this.Controls.Add(this.tblLbl);
            this.Name = "Login";
            this.Text = "Login";
            this.Load += new System.EventHandler(this.Login_Load);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion
        private System.Windows.Forms.Label tblLbl;
        private System.Windows.Forms.Label htlLbl;
        private System.Windows.Forms.TextBox tblLblTxt;
        private System.Windows.Forms.ComboBox htlLblDrop;
        private System.Windows.Forms.Button btnOk;
    }
}