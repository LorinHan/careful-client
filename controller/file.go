package controller

import "context"

type FileController struct {
	ctx context.Context
}

func (t *FileController) Add(i int) int {
	return i + i
}
