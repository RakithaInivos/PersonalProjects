﻿namespace SelfCareApp.View
{
    partial class Display
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
            this.ConGphnTxt = new System.Windows.Forms.Label();
            this.ConGphn = new System.Windows.Forms.Label();
            this.SuspendLayout();
            // 
            // ConGphnTxt
            // 
            this.ConGphnTxt.AutoSize = true;
            this.ConGphnTxt.Font = new System.Drawing.Font("Microsoft YaHei UI", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.ConGphnTxt.Location = new System.Drawing.Point(333, 78);
            this.ConGphnTxt.Name = "ConGphnTxt";
            this.ConGphnTxt.Size = new System.Drawing.Size(152, 27);
            this.ConGphnTxt.TabIndex = 6;
            this.ConGphnTxt.Text = "............................";
            // 
            // ConGphn
            // 
            this.ConGphn.AutoSize = true;
            this.ConGphn.Font = new System.Drawing.Font("Microsoft YaHei UI", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.ConGphn.Location = new System.Drawing.Point(106, 78);
            this.ConGphn.Name = "ConGphn";
            this.ConGphn.Size = new System.Drawing.Size(193, 27);
            this.ConGphn.TabIndex = 5;
            this.ConGphn.Text = "Phone Number =>";
            // 
            // Display
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(800, 484);
            this.Controls.Add(this.ConGphnTxt);
            this.Controls.Add(this.ConGphn);
            this.Name = "Display";
            this.Text = "Display";
            this.Load += new System.EventHandler(this.Display_Load);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Label ConGphnTxt;
        private System.Windows.Forms.Label ConGphn;
    }
}