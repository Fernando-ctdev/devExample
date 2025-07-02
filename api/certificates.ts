import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getCertificates = async (req: Request, res: Response) => {
  try {
    const certificates = await prisma.certificate.findMany({
      include: {
        technology: {
          select: {
            id: true,
            name: true,
            title: true,
            color: true,
            logo: true
          }
        }
      },
      orderBy: {
        issueDate: 'desc'
      }
    });

    res.status(200).json({
      success: true,
      data: certificates
    });
  } catch (error) {
    console.error('Erro ao buscar certificados:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
};

export const createCertificate = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      issuer,
      issueDate,
      expiryDate,
      credentialId,
      link,
      imageUrl,
      skills,
      technologyId
    } = req.body;

    // Validações básicas
    if (!title || !issuer || !issueDate || !link) {
      return res.status(400).json({
        success: false,
        error: 'Campos obrigatórios: title, issuer, issueDate, link'
      });
    }

    const certificate = await prisma.certificate.create({
      data: {
        title,
        description,
        issuer,
        issueDate: new Date(issueDate),
        expiryDate: expiryDate ? new Date(expiryDate) : null,
        credentialId,
        link,
        imageUrl,
        skills: skills || [],
        technologyId: technologyId || null
      },
      include: {
        technology: {
          select: {
            id: true,
            name: true,
            title: true,
            color: true,
            logo: true
          }
        }
      }
    });

    res.status(201).json({
      success: true,
      data: certificate
    });
  } catch (error) {
    console.error('Erro ao criar certificado:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
};

export const updateCertificate = async (req: Request, res: Response) => {
  try {
    const {
      id,
      title,
      description,
      issuer,
      issueDate,
      expiryDate,
      credentialId,
      link,
      imageUrl,
      skills,
      technologyId
    } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        error: 'ID do certificado é obrigatório'
      });
    }

    const certificate = await prisma.certificate.update({
      where: { id },
      data: {
        title,
        description,
        issuer,
        issueDate: issueDate ? new Date(issueDate) : undefined,
        expiryDate: expiryDate ? new Date(expiryDate) : null,
        credentialId,
        link,
        imageUrl,
        skills: skills || [],
        technologyId: technologyId || null
      },
      include: {
        technology: {
          select: {
            id: true,
            name: true,
            title: true,
            color: true,
            logo: true
          }
        }
      }
    });

    res.status(200).json({
      success: true,
      data: certificate
    });
  } catch (error) {
    console.error('Erro ao atualizar certificado:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
};

export const deleteCertificate = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        error: 'ID do certificado é obrigatório'
      });
    }

    await prisma.certificate.delete({
      where: { id }
    });

    res.status(200).json({
      success: true,
      message: 'Certificado deletado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao deletar certificado:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
};
